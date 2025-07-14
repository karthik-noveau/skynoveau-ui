export const LIBRARY_LIST = [
  {
    name: "@skynoveau-ui/core",
    rootPath: "./package/react/core",
    allowVersionChange: true,
  },
];

export const PLAYGROUND_LIST = [
  {
    name: "playground/react",
    rootPath: "./playground/react",
    localPkgList: ["@skynoveau-ui/core", "@skynoveau-ui/utils"],
  },
];