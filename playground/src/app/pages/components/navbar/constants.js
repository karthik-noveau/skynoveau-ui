import logoImg from "@assets/logo/skynoveau-ui-logo.png";

export const NAV_CONFIG = {
  logo: {
    imgSrc: logoImg,
    label: "Skynoveau ui",
  },
  menus: [
    { label: "Components", path: "/components" },
    { label: "Theme", path: "/theme" },
    {
      label: "Products",
      dropdown: [
        {
          label: "Skynoveau workflow",
          url: "https://workflow.skynoveau.in/space",
        },
        { label: "Skynoveau editor", url: "https://editor.skynoveau.in" },
      ],
    },
  ],
};
