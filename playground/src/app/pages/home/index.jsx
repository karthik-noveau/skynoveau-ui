import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@pages/components/navbar";
import { Button, Helmet } from "@skynoveau-ui/core";

import styles from "./home.module.css";

import antImg from "./assets/ant-img.png";
import cssImg from "./assets/css-img.png";
import htmlImg from "./assets/html-img.png";
//technologies images
import ReactImg from "./assets/react-img.png";

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
          <h1 className={`text-60 weight-500 ${styles.title}`}>
            Build modern <br />
            web applications with
            <span> Skynoveau UI</span>
          </h1>
          <p className={`text-18 ${styles.description}`}>
            A developer-first design system to create fast, modern web
            applications.
          </p>
          <Button
            className={`text-18 ${styles.exploreButton}`}
            onClick={() => navigate("/components")}
          >
            Browse Components
          </Button>

          {/* ---------- tech stact ---------- */}
          <div className={`wrapper wrapper-margin-top`}>
            <h1
              className={`title-18 weight-300 container-margin-top ${styles.stackTitle}`}
            >
              {/* Library build with */}
            </h1>
            <div
              className={`container container-margin-top ${styles.techContainer}`}
            >
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
