import { CgFacebook } from "react-icons/";
import { AiFillInstagram } from "react-icons/ai";
import { PiYoutubeLogoFill } from "react-icons/pi";

export const SOCIAL_MEDIA_LINKS = [
  {
    icon: CgFacebook,
    path: "https://www.facebook.com/profile.php?id=61566750161176",
  },
  {
    icon: AiFillInstagram,
    path: "https://www.instagram.com/dhanikabysanskriti/",
  },

  {
    icon: PiYoutubeLogoFill,
    path: "https://www.youtube.com/@DhanikabySanskriti",
  },
];

export const FOOTER_MENU_LINKS = [
  {
    title: "QUICK LINKS",
    links: [
      { name: "Home", path: "/home" },
      { name: "Story", path: "/story" },
      { name: "Collections", path: "/collections" },
      { name: "FAQs", path: "/faqs" },
    ],
  },
  {
    title: "QUICK CONTACT",
    links: [
      { name: "Contact with us" },
      {
        name: `<span class="text-16 primary-color-dark">+91 9500342171
</span>`,
      },
      {
        name: `<span class="text-16 primary-color-dark">+91 9500343171
</span>`,
      },
      { name: "hello@dhanika.co.in" },
    ],
  },
  {
    title: "OUR ADDRESS",
    links: [
      { name: "Return & Exchange Policy", path: "/return-exchange-policy" },
      { name: "Shipping policy", path: "/shipping-policy" },
      { name: "Terms & Conditions", path: "/terms-conditions" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
  },
];
