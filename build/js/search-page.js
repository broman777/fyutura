$(function () {
    $('#search-form').on('submit', function (e) {
        e.preventDefault();
        var url = $(this).attr('action'),
            data = $(this).serialize();

        $.post({
            url: url,
            data: data,
            success: function (data) {
                var postContainer = $('#search-articles'),
                    documentContainer = $('#search-documents'),
                    emptyResult = $('#search-empty-result');

                postContainer.empty().show();
                documentContainer.empty().show();
                emptyResult.hide();

                if (data.emptyResult == false) {
                    postContainer.append(data.postContainer);
                    documentContainer.append(data.documentContainer);
                } else {
                    postContainer.hide();
                    documentContainer.hide();
                    emptyResult.show();
                }
            }
        });
    });

    $(document).on('click', '.more', function (e) {
        e.preventDefault();

        var self = $(this),
            url = self.attr('href'),
            maxPages = self.data('max-page'),
            currentPage = self.data('current-page');

        if (currentPage < maxPages) {
            currentPage++;

            $.post({
                url: url + '?page=' + currentPage,
                data: $('#search-form').serialize(),
                success: function (data) {
                    self.parent().find('.item-container').append(data);
                    self.data('current-page', currentPage);

                    if (currentPage === maxPages) {
                        self.hide();
                    }
                },
                error: function () {
                    self.hide();
                }
            });

        }
    });
});