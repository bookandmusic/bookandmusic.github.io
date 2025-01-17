import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import { defaultSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://bookandmusic.cn",

  author: {
    name: "Mr.Liu",
    url: "https://bookandmusic.cn",
    email: "lsf_2012@163.com"
  },
  blog: {
    avatar: "https://jsd.vxo.im/gh/bookandmusic/static/site/2024-11/507aa512c80594479b9abf8119430ee8.png",
  },
  iconAssets: "fontawesome-with-brands",

  logo: "https://jsd.vxo.im/gh/bookandmusic/static/site/2024-11/dcb215b7f608a9dd29989286312446d4.webp",

  pure: true,

  favicon: "https://jsd.vxo.im/gh/bookandmusic/static/site/2024-11/dcb215b7f608a9dd29989286312446d4.webp",

  repo: "bookandmusic/docs",

  docsRepo: "bookandmusic/docs",
  docsDir: "src",
  docsBranch: "master",

  // navbar
  navbar,
  // sidebar
  sidebar: defaultSidebar,

  footer: '<a href="http://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">备案号: 京ICP备2021028097号</a> | <a href="/about/">关于网站</a>',

  displayFooter: true,

  breadcrumb: false,

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    docsearch:{
      appId: 'C9YU2PEVXB',
      apiKey: '5eef31dc0ce26cb714532aa51f41b4d1',
      indexName: 'bookandmusic',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    },
    blog: {
      excerptLength: 100,
    },
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "bookandmusic/comments",
      repoId: "R_kgDOJf0cDA",
      category: "Announcements",
      categoryId: "DIC_kwDOJf0cDM4CWUUJ",
      lazyLoading: true,
    },
    markdownMath: true,
    markdownImage: true,
    markdownTab: true,
  },
});
