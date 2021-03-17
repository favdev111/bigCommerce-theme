import _ from 'lodash';

export default class {
    constructor(context) {
        this.context = context;
        this.bind();
    }

    loadArticles(category, page, posts) {
        const container = $(`[data-category-section="${category}"]`);
        container.find('[data-pagination-next]').attr('data-page', page);
        const filter = container.data('current-filter');
        const currentSection = container.data('category-section');
        let perPage = null;
        let count = null;


        $.get('/__website-articles-output/', (data) => {
            const json = JSON.parse(data.replace(/\r?\n|\r/g, '').replace(/ /g, '').trim());
            const blogPosts = _.groupBy(json, el => el.category);

            Object.keys(blogPosts).forEach(cat => {
                const categoryName = _.camelCase(cat);

                if (cat === currentSection) {
                    count = 0;
                    perPage = 2;
                    const startOutput = (page * perPage) - perPage;
                    const endOutput = (startOutput + perPage) - 1;
                    const currentSectionPostCount = blogPosts[category].length;
                    const countOccurrences = (arr, val) => arr.reduce((a, v) => ((val === v) ? a + 1 : a), 0);
                    const categoryGroupCount = countOccurrences(posts, categoryName);
                    container.attr('data-current-group-count', categoryGroupCount);
                    container.attr('data-current-section-count', currentSectionPostCount);
                    for (let i = 0; i < blogPosts[category].length; i++) {
                        const post = blogPosts[category][i];
                        const postTags = post.tags;
                        const postName = _.snakeCase(post.name);
                        if (count >= startOutput && count <= endOutput) {
                            // console.log(post.name +': '+ postTags.indexOf(filter) + ' posttags: ' + postTags+ ' filter: ' + filter);
                            if (filter.length === 0 && postTags.indexOf(filter) !== -1 && filter === '') {
                                break;
                            }
                            if (posts.indexOf(postName) === -1) {
                                break;
                            }
                            const postArticle = $('[data-post-markup]').clone(true);
                            const postClass = post.url.split('/');
                            const postTagsSplit = post.tags.split('|');
                            postArticle.show();
                            postTagsSplit.forEach(tag => {
                                const formattedTag = _.startCase(tag);
                                if (container.find(`[data-tag="${tag}"]`).length === 0 && tag.length) {
                                    container.find('.blog-tag-list').append(`<div class="blog-tag" data-tag="${tag}">${formattedTag}</div>`);
                                }
                            });
                            postArticle.find('[data-insert-bg-thumbnail]').each((index, a) => {
                                const ele = $(a);
                                if (ele.is('img')) {
                                    ele.attr('src', post.thumbnail_large).removeAttr('data-insert-bg-thumbnail');
                                } else {
                                    ele.attr('style', `background-image: url(${post.thumbnail_large};`).removeAttr('data-insert-bg-thumbnail');
                                }
                            });
                            postArticle.find('[data-insert-title]').text(post.name).removeAttr('data-insert-title');
                            postArticle.attr('data-category', post.category);
                            postArticle.attr('data-tags', post.tags);
                            postArticle.find('[data-insert-summary]').html(`${post.summary}...`).removeAttr('data-insert-summary');
                            postArticle.find('[data-insert-url]').attr('href', post.url).removeAttr('data-insert-url');
                            if (postArticle.hasClass('article-type--')) {
                                postArticle.addClass(`article-type--${postClass[1]}`);
                                postArticle.removeClass('article-type--');
                            }
                            postArticle.removeAttr('data-post-markup');
                            $(container).find('.blog-post-list').append(postArticle);
                            posts.push(postName);
                            posts.push(categoryName);
                        }
                        count++;
                    }
                    container.find('[data-pagination-next]').attr('data-post-count', count);
                    // hiding loader svg
                    container.find('.loading').css('display', 'none');
                    if (container.find('[data-pagination-next]').length) {
                        container.append(container.find('.loading'));
                        // Calc pages
                        if (count > perPage) {
                            this.customPaging(container, posts);
                        }
                    }
                }
            });
        });
    }

    loadMore(e, container) {
        e.preventDefault();
        const btn = $(e.target);
        btn.hide();
        $(container).find('.loading').show();
        const page = btn.data('page');
        this.loadArticles(container, page);
    }

    bind() {
        $('[data-load-posts]').each((i, a) => this.loadArticles(a, 1));

        $('[data-load-posts]').on('click', '[data-pagination-next]', (e) => {
            const container = $(e.target).parents('[data-load-posts]')[0];
            this.loadMore(e, container);
        });
    }
}
