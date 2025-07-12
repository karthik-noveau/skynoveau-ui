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
  { image: DhanikaImg },
  { image: LexlumiereImg },
  { image: UnisysImg },
  { image: WoodheadCreative },
  { image: WoodheadEvents },
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
                Build modern web applications with
                <span> SkynoveauUI</span>
              </h1>
              <p className={`text-18 ${styles.description}`}>
                A developer-first design system to create fast, modern web
                applications
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
                    {/* <p className={`text-18 weight-400 ${styles.techName}`}>
                      {item.name}
                    </p> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* ---------- show case ---------- */}
        <h1
          className={`text-34 weight-400 wrapper-margin-top ${styles.landingTitle}`}
        >
          Showcase
        </h1>
        <p className={`text-16 weight-300 ${styles.landingDescription}`}>
          Choose Skynoveau UI to build your landing pages
        </p>
        <div
          className={`container container-margin-top ${styles.showCaseContainer}`}
        >
          <TechStackSlide items={SHOW_CASE} />
        </div>
        <p className={`text-16 ${styles.footer}`}>
          Source code is available on{" "}
          <a
            href="https://github.com/karthik-noveau/skynoveau-ui"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </p>
      </div>
    </>
  );
}
