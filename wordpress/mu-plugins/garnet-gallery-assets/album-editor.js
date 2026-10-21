(function (wp) {
    'use strict';

    function AlbumGuidance() {
        const postType = wp.data.useSelect(function (select) { return select('core/editor').getCurrentPostType(); }, []);
        wp.element.useEffect(function () {
        const editor = wp.data.select('core/editor');
        if (postType !== 'garnet_photo_album') return;

        function albumName() {
            return editor.getEditedPostAttribute('title') || 'this new album';
        }

        function addPhotos() {
            const destination = albumName();
            const frame = wp.media({
                title: 'Add photos to ' + destination,
                button: { text: 'Add to this album' },
                library: { type: 'image' },
                multiple: 'add',
            });
            frame.on('select', function () {
                const store = wp.data.select('core/block-editor');
                const actions = wp.data.dispatch('core/block-editor');
                const galleries = store.getBlocks().filter(function (block) { return block.name === 'core/gallery'; });
                const existingIds = new Set();
                function collect(blocks) {
                    blocks.forEach(function (block) {
                        if (block.name === 'core/image' && block.attributes.id) existingIds.add(Number(block.attributes.id));
                        (block.attributes.ids || []).forEach(function (id) { existingIds.add(Number(id)); });
                        collect(block.innerBlocks || []);
                    });
                }
                collect(store.getBlocks());
                const photos = frame.state().get('selection').toJSON().filter(function (photo) {
                    if (existingIds.has(Number(photo.id))) return false;
                    existingIds.add(Number(photo.id));
                    return true;
                }).map(function (photo) {
                    const size = photo.sizes && (photo.sizes.large || photo.sizes.full);
                    return wp.blocks.createBlock('core/image', {
                        id: photo.id, url: size ? size.url : photo.url,
                        alt: photo.alt || '', caption: photo.caption || '',
                        sizeSlug: size && photo.sizes.large ? 'large' : 'full', linkDestination: 'none',
                    });
                });
                if (photos.length) {
                    const gallery = galleries[0];
                    if (gallery) {
                        actions.insertBlocks(photos, store.getBlockOrder(gallery.clientId).length, gallery.clientId, false);
                    } else {
                        actions.insertBlocks(wp.blocks.createBlock('core/gallery', { linkTo: 'none', columns: 3 }, photos));
                    }
                }
                wp.data.dispatch('core/notices').createNotice('info', photos.length
                    ? photos.length + ' photo(s) added to ' + destination + '. Choose Save or Publish to keep your changes.'
                    : 'Those photos are already in this album. No duplicates were added.',
                { id: 'garnet-photos-added', isDismissible: true });
            });
            frame.open();
        }

        // Reuse the native editor notice area, including keyboard-accessible action buttons.
        let lastTitle;
        function showGuidance() {
            const title = albumName();
            if (title === lastTitle) return;
            lastTitle = title;
            wp.data.dispatch('core/notices').createNotice('info',
                'Adding photos to ' + title + '. Upload new photos or choose them from Media Library, then Save or Publish this album.',
                { id: 'garnet-album-destination', isDismissible: false,
                    actions: [{ label: 'Add photos to this album', onClick: addPhotos }] });
        }
        showGuidance();
        const unsubscribe = wp.data.subscribe(showGuidance);
        return unsubscribe;
        }, [postType]);
        return null;
    }
    wp.plugins.registerPlugin('garnet-album-guidance', { render: AlbumGuidance });
})(window.wp);
