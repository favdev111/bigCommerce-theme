export default class {
    constructor() {
        this.init();
    }
    init() {
    const parts = window.location.search.substr(1).split('&');
    const $_GET = {};
        for (let i = 0; i < parts.length; i++) {
            const temp = parts[i].split('=');
            $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
        }
        if ($_GET.limit !== undefined && $_GET.limit !== null && $_GET.limit !== '') {
            let DataSet;
            $('.btn-view').each(function () {
                DataSet = String($(this).data('view'));
                DataSet = DataSet.trim();
                if (String($_GET.limit).trim() === DataSet) {
                    $(this).addClass('active');
                }
            });
        }
    }
}

$('.two-grid-btn').click(() => {
    var productWidth = ($('.productGrid').width()-72)/2;
    $('.product').width(productWidth);
});

$('.three-grid-btn').click(() => {
    var productWidth = ($('.productGrid').width()-72)/3;
    $('.product').width(productWidth);
});
