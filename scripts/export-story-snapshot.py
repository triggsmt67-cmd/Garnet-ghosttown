#!/usr/bin/env python3
"""Export published LocalWP stories and their media for the customer review site."""
import hashlib
import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CMS = 'http://garnet-cms.local'
UPLOADS = Path('/Users/trevorriggs/Local Sites/garnet-cms/app/public/wp-content/uploads').resolve()
DEST = ROOT / 'public/images/story-snapshot'
queries = (ROOT / 'lib/content/queries.ts').read_text()
image_fields = re.search(r'const IMAGE_FIELDS.*?`(.*?)`;', queries, re.S).group(1)
query = re.search(r'export const STORIES_QUERY.*?`(.*?)`;', queries, re.S).group(1).replace('${IMAGE_FIELDS}', image_fields)
query = query.replace('nodes {\n        databaseId', 'pageInfo { hasNextPage }\n      nodes {\n        databaseId', 1)
request = Request(CMS + '/graphql', data=json.dumps({'query': query}).encode(), headers={'Content-Type': 'application/json'})
with urlopen(request, timeout=30) as response:
    payload = json.load(response)
if payload.get('errors'):
    raise RuntimeError(payload['errors'])
data = payload['data']
if data['garnetStories']['pageInfo']['hasNextPage']:
    raise RuntimeError('More than 200 stories: add pagination before exporting.')
if not data['garnetStories']['nodes']:
    raise RuntimeError('Empty export refused; existing snapshot retained.')
files = {}
pattern = re.compile(re.escape(CMS) + r'/wp-content/uploads/[^\s\"\'<>]+')
def local_image(match):
    url = match.group(0)
    relative = unquote(urlparse(url).path.removeprefix('/wp-content/uploads/'))
    source = (UPLOADS / relative).resolve()
    if not source.is_relative_to(UPLOADS) or not source.is_file():
        raise RuntimeError('Missing or unsafe media path: ' + relative)
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:16]
    filename = digest + '-' + re.sub(r'[^A-Za-z0-9._-]', '-', source.name)
    files[filename] = source
    return '/images/story-snapshot/' + filename

def rewrite(value):
    if isinstance(value, str):
        result = pattern.sub(local_image, value)
        if CMS in result:
            raise RuntimeError('Unresolved local WordPress URL in exported content.')
        return result
    if isinstance(value, list):
        return [rewrite(item) for item in value]
    if isinstance(value, dict):
        return {key: rewrite(item) for key, item in value.items()}
    return value

snapshot = {'exportedAt': datetime.now(timezone.utc).isoformat(), 'data': rewrite(data)}
DEST.mkdir(parents=True, exist_ok=True)
for filename, source in files.items():
    shutil.copy2(source, DEST / filename)
(ROOT / 'lib/content/story-snapshot.json').write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n')
print(f'Exported {len(data["garnetStories"]["nodes"])} published stories and {len(files)} image files.')
