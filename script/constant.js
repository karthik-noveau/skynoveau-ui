export const LIBRARY_LIST = {
  react: [
    {
      name: "@skynoveau-ui/core",
      rootPath: "./package/react/core",
      pkgList: ["@skynoveau-ui/utils"],
    },
  ],
};

export const PLAYGROUND_LIST = [
  {
    name: "react",
    rootPath: "./playground/react",
    localPkgList: LIBRARY_LIST["react"],
  },
];
