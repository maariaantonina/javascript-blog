{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const attHref = clickedElement.getAttribute('href');

    const selectedArticle = document.querySelector(attHref);

    selectedArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.list .tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let el;
    let fragment = document.createDocumentFragment();
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector)
        .innerHTML;
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

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function calculateTagsParams(tags) {
    let params = { min: 10000, max: 0 };
    for (let tag in tags) {
      console.log(tag, 'is used', tags[tag]);
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const paramsDelta = params.max - params.min
    const tagPercentage = (count - params.min) / paramsDelta;
    const classNumber = Math.floor((tagPercentage * (optCloudClassCount - 1)) + 1);
    return optCloudClassPrefix + classNumber
  }

  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const tags = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for (let tag of articleTagsArray) {
        const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        html = html + linkHtml;
        if (!allTags.hasOwnProperty(tag)) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      const tagList = document.querySelector('.tags');
      tags.innerHTML = html;
      const tagsParams = calculateTagsParams(allTags);
      let allTagsHTML = '';
      for (let tag in allTags) {
        const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
        console.log('taglinkHTML', tagLinkHTML);
        allTagsHTML += tagLinkHTML;
      }
      tagList.innerHTML = allTagsHTML;
    }
  }

  generateTags();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let tagLink of tagLinks) {
      tagLink.classList.remove('active');
    }
    const selectedLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let selectedLink of selectedLinks) {
      selectedLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    for (let tagLink of tagLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  }

  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const author = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHtml = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + linkHtml;
      author.innerHTML = html;
    }
  }

  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let authorLink of authorLinks) {
      authorLink.classList.remove('active');
    }
    const selectedLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let selectedLink of selectedLinks) {
      selectedLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}
