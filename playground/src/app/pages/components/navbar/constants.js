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
          label: "UI Paletton",
          url: "https://zrwy2w.csb.app",
        },
        { label: "Pixup", url: "https://pix-studio.vercel.app" },
        // { label: "Mail Pilot", url: "https://editor.skynoveau.in" },
        { label: "Blog Editor", url: "https://editor.skynoveau.in" },
        { label: "Web Spliter", url: "https://webspliter.skynoveau.in" },
      ],
    },
  ],
};
