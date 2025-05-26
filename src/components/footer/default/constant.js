import { CgFacebook } from "react-icons/cg";
import { AiFillInstagram } from "react-icons/ai";
import { BiLogoLinkedin } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";

export const SOCIAL_MEDIA_LINKS = [
  {
    icon: <CgFacebook />,
    path: "#",
  },
  {
    icon: <AiFillInstagram />,
    path: "#",
  },
  {
    icon: <BiLogoLinkedin />,
    path: "#",
  },
  { icon: <RiTwitterXFill />, path: "https://x.com/woodheadevents" },
];

export const FOOTER_MENU_LINKS = [
  {
    title: "QUICK LINKS",
    links: [
      { name: "Home", path: "/home" },
      { name: "Story", path: "/story" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Contact us", path: "/connect" },
    ],
  },
  {
    title: "QUICK CONTACT",
    links: [
      { name: "Feel free to call" },
      { name: "+91 9360375911" },
      { name: "Connect us", path: "/connect" },
    ],
  },
  {
    title: "OUR ADDRESS",
    links: [
      { name: "3/51, Office Door Number" },
      { name: "Street Name, area name" },
      { name: "Chennai, Tamil Nadu 000 000" },
    ],
  },
];
