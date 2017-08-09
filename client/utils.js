import marked from 'marked';

marked.setOptions({
  gfm: true,
  sanitize: true,
});

const REPO_AUTHOR = 'camden';
const REPO_NAME = 'rulebooks';
const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_API_URL = `/repos/${REPO_AUTHOR}/${REPO_NAME}/contents`;

export const getMarkdown = () => {
  const rulebooksPath = '/rulebooks/';

  const url = GITHUB_ROOT + GITHUB_API_URL + rulebooksPath;
  fetch(url).then(res => res.json()).then(res => {
    console.log(res);
    for (let fileRes of res) {
      getFileData(fileRes.download_url);
    }
  });
};

const getFileData = rawUrl => {
  console.log(rawUrl);
  fetch(rawUrl).then(res => res.text()).then(res => {
    console.log(marked(res));
  });
};
