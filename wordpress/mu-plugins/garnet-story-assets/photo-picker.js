(function ($) {
    'use strict';
    function setup(root) {
        const $root = $(root);
        if ($root.data('garnet-ready')) return;
        $root.data('garnet-ready', true);
        const name = root.dataset.inputName;
        const $list = $root.find('.garnet-story-photo-list');
        const $values = $root.find('.garnet-story-photo-values');
        const $status = $root.find('.garnet-story-photo-status');
        let photos = JSON.parse(root.dataset.photos || '[]');
        function save() {
            $values.empty().append($('<input>', {type: 'hidden', name: name, value: ''}));
            photos.forEach(function (photo) {
                $values.append($('<input>', {type: 'hidden', name: name + '[]', value: photo.id}));
            });
            $values.find('input').first().trigger('change');
        }
        function draw(focusId, action) {
            $list.empty();
            photos.forEach(function (photo, index) {
                const $item = $('<li>', {'data-id': photo.id, class: 'garnet-story-photo'});
                $item.append($('<img>', {src: photo.src, alt: '', draggable: false}));
                $item.append($('<p>').text(photo.title || 'Photograph'));
                const $controls = $('<div>', {class: 'garnet-story-photo-controls'});
                [['previous', '←', -1], ['next', '→', 1]].forEach(function (move) {
                    $controls.append($('<button>', {type: 'button', class: 'button', text: move[1], 'data-action': move[0], 'aria-label': 'Move photo ' + (index + 1) + ' ' + move[0], disabled: index + move[2] < 0 || index + move[2] >= photos.length}).on('click', function () {
                        const other = index + move[2];
                        [photos[index], photos[other]] = [photos[other], photos[index]];
                        save(); draw(photo.id, move[0]);
                        $status.text('Photo moved to position ' + (other + 1) + '.');
                    }));
                });
                $controls.append($('<button>', {type: 'button', class: 'button-link-delete', text: 'Remove', 'data-action': 'remove', 'aria-label': 'Remove photo ' + (index + 1) + ' from this story'}).on('click', function () {
                    photos.splice(index, 1); save(); draw();
                    $root.find('.garnet-story-add-photos').trigger('focus');
                    $status.text('Photo removed from this story. Save to keep changes.');
                }));
                $list.append($item.append($controls));
            });
            if (focusId) {
                const $target = $list.find('[data-id="' + focusId + '"] [data-action="' + action + '"]');
                if (!$target.prop('disabled')) $target.trigger('focus');
                else $list.find('[data-id="' + focusId + '"] [data-action="remove"]').trigger('focus');
            }
        }
        $list.sortable({items: '> li', cancel: 'button', tolerance: 'pointer', update: function () {
            const order = $list.children().map(function () { return Number(this.dataset.id); }).get();
            photos.sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
            save(); $status.text('Photo order updated. Save to keep changes.');
        }});
        $root.find('.garnet-story-add-photos').on('click', function () {
            const frame = wp.media({title: 'Add photos to this story', button: {text: 'Add to story'}, library: {type: 'image'}, multiple: 'add'});
            frame.on('select', function () {
                let added = 0;
                let overflow = false;
                frame.state().get('selection').each(function (attachment) {
                    const image = attachment.toJSON();
                    if (photos.some(function (photo) { return photo.id === image.id; })) return;
                    if (photos.length >= 30) { overflow = true; return; }
                    photos.push({id: image.id, src: image.sizes && image.sizes.thumbnail ? image.sizes.thumbnail.url : image.url, title: image.title || image.filename});
                    added++;
                });
                save(); draw();
                $status.text(overflow ? 'Up to 30 photos are supported. Extra selections were skipped.' : added + ' photo(s) added. Save the story to keep changes.');
                frame.remove();
                $root.find('.garnet-story-add-photos').trigger('focus');
            });
            frame.open();
        });
        draw();
    }
    function init($el) {
        $($el || document).find('.garnet-story-photo-picker').each(function () { setup(this); });
    }
    $(function () { init(document); });
    if (window.acf) { acf.addAction('append', init); }
})(jQuery);
