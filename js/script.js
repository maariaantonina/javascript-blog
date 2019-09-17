{
    /*document.getElementById('test-button').addEventListener('click', function() {
        const links = document.querySelectorAll('.titles a');
        console.log('links:', links);
    });*/

    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        console.log('clickedElement (with plus): ' + clickedElement);
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const attHref = clickedElement.getAttribute('href');
        console.log('attHref= ' + attHref);

        /* [DONE]find the correct article using the selector (value of 'href' attribute) */
        const selectedArticle = document.querySelector(attHref);
        console.log(selectedArticle);

        /* [DONE] add class 'active' to the correct article */
        selectedArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        let el;
        let fragment = document.createDocumentFragment();
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find the title element & get the title from the title element*/
            const articleTitle = article.querySelector(optTitleSelector)
                .innerHTML;
            /* create HTML of the link */
            el = document.createElement('li');
            el.innerHTML =
                '<a href="#' +
                articleId +
                '"><span>' +
                articleTitle +
                '</span></a>';
            fragment.appendChild(el);
        }
        titleList.appendChild(fragment);
    }

    generateTitleLinks();

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
