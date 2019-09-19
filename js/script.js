{
  /*document.getElementById('test-button').addEventListener('click', function() {
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
  });*/

  const titleClickHandler = function (event) {
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
  optArticleTagsSelector = '.post-tags .list'

  function generateTitleLinks() {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector)
        .innerHTML;
      /* create HTML of the link */
      const linkHtml =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      console.log(linkHtml);
      /* insert link into titleList */
      //titleList.insertAdjacentHTML('beforeend', linkHtml);
      /* insert link into html variable */
      html = html + linkHtml;
    }
    titleList.innerHTML = html;
    console.log(html);
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tags = article.querySelector(optArticleTagsSelector);
      console.log(tags)
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + ' </a></li>';
        console.log(linkHtml);
        /* add generated code to html variable */
        html = html + linkHtml;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tags.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }

  generateTags();

}
