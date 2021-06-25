import MarkdownIt from 'markdown-it'

export default new MarkdownIt({
  breaks: false,
  html: true,
  // linkify: true,
  highlight: (str, lang) => {
    const hljs = require('highlight.js/lib/core')
    hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
    hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
    hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
    const languageName = lang.split(':')[0]
    const filename = lang.split(':')[1]
    if (lang && hljs.getLanguage(languageName)) {
      try {
        return (
          '<pre class="hljs ' +
          languageName +
          (filename ? '" name="' + filename + '"><code>' : '><code>') +
          hljs.highlight(languageName, str, true).value +
          '</code></pre>'
        )
      } catch (__) { }
      return (
        '<pre class="hljs"><code>' +
        hljs.highlight('plaintext', str, true).value +
        '</code></pre>'
      )
    } else {
      return '<pre class="hljs"><code>' +
        str +
        '</code></pre>'
    }
  },
})