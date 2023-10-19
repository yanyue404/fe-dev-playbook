module.exports = {
  title: "fe-dev-playbook",
  base: "/fe-dev-playbook/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://avatars1.githubusercontent.com/u/24217900?s=200&v=4",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        itemprop: "keywords",
        content: "打造舒适的前端开发环境",
      },
    ],
    [
      "meta",
      {
        property: "og:title",
        content: "fe-dev-playbook",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "前端开发环境",
      },
    ],
  ],
  description: "打造舒适高效的前端开发环境",
  themeConfig: {
    nav: [
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "Github",
        link: "https://github.com/yanyue404/fe-dev-playbook",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          collapsable: false,
          children: [
            "Shell",
            "Nodejs",
            "VSCode",
            "BreakingPoint",
            "Ts",
            "Git",
            "Chrome",
            "Fe",
            "Vim",
            "Mac",
            "Command",
            "Utils",
            "Tips",
            "Algorithm",
            "Github",
          ],
        },
      ],
    },
  },
};
