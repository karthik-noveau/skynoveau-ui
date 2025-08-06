export const LIBRARY_LIST = {
  react: [
    {
      name: "@skynoveau-ui/core",
      rootPath: "./package/core",
      pkgList: ["@skynoveau-ui/utils"],
    },
  ],
};

export const PLAYGROUND_LIST = [
  {
    name: "playground",
    rootPath: "./playground",
    localPkgList: LIBRARY_LIST["react"],
  },
];
