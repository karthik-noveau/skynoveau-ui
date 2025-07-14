import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@pages/components/navbar";
import { Button, Helmet } from "@skynoveau-ui/core";

import { TechStackSlide } from "./slider";

import styles from "./home.module.css";

import DhanikaImg from "./assets/show-case/dhanika.png";
import LexlumiereImg from "./assets/show-case/lexlumiere.png";
import UnisysImg from "./assets/show-case/unisys.png";
import WoodheadCreative from "./assets/show-case/woodhead-creative.png";
import WoodheadEvents from "./assets/show-case/woodhead-events.png";
import antImg from "./assets/tech-stack/ant-img.png";
import cssImg from "./assets/tech-stack/css-img.png";
import htmlImg from "./assets/tech-stack/html-img.png";
import ReactImg from "./assets/tech-stack/react-img.png";

const TECH_STACK = [
  { image: ReactImg, name: "React" },
  {
    image: htmlImg,
    name: "HTML",
  },
  {
    image: cssImg,
    name: "CSS",
  },
  {
    image: antImg,
    name: "Ant Design",
  },
];

const SHOW_CASE = [
  { image: DhanikaImg, name: "Dhanika", url: "https://dhanika.co.in" },
  { image: LexlumiereImg, name: "Lexlumiere", url: "https://lexlumiere.com" },
  { image: UnisysImg, name: "Unisys", url: "https://unisystechnologies.com" },
  {
    image: WoodheadCreative,
    name: "Woodhead Creative",
    url: "https://woodheadcreative.co",
  },
  {
    image: WoodheadEvents,
    name: "Woodhead Events",
    url: "https://woodheadevents.com",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet
        title="Explore Modern UI Components for Web Development | SUI Components"
        description="Discover a wide range of modern UI components with SUI (SkyUI). Enhance your website development with customizable and responsive components designed for modern web applications."
        keywords="UI components, web components, modern UI components, customizable web components, responsive UI elements, explore customizable and responsive UI components for web development, modern web components with SUI, SkyUI modern UI components for fast web design"
      />

      <NavigationBar />

      {/* ---------- product info ---------- */}

      <div className={`${styles.infoContainer}`}>
        <div className={`${styles.infoSection}`}>
          <div className={`wrapper wrapper-margin-top`}>
            <div className={`container container-margin-top`}>
              <h1 className={`text-60 weight-500 ${styles.title}`}>
                Build Modern Web Apps with <span> Skynoveau UI</span>
              </h1>
              <p className={`text-18 ${styles.description}`}>
                A developer-first design system to create fast and responsive
                web apps
              </p>
            </div>
          </div>
          <Button
            className={`text-18 ${styles.exploreButton}`}
            onClick={() => navigate("/components")}
          >
            Browse Components
          </Button>

          {/* ---------- tech stact ---------- */}
          <div className={`wrapper wrapper-margin-top`}>
            <div className={`container ${styles.techContainer}`}>
              {TECH_STACK.map((item, index) => {
                return (
                  <div key={index} className={` ${styles.techImageWrapper}`}>
                    <img src={item.image} alt={item.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* ---------- show case ---------- */}
        <h1
          className={`text-28 weight-400 wrapper-margin-top ${styles.landingTitle}`}
        >
          Deployed Sites
        </h1>
        <p className={`text-16 weight-300 ${styles.landingDescription}`}>
          Developed using the Skynoveau UI component library
        </p>
        <div
          className={`container container-margin-top ${styles.showCaseContainer}`}
        >
          <TechStackSlide items={SHOW_CASE} />
        </div>
        <p className={`text-16 ${styles.footer}`}>
          Made with ♥️ by{" "}
          <a href="https://skynoveau.in/" target="_blank" rel="noreferrer">
            Skynoveau
          </a>
        </p>
      </div>
    </>
  );
}
