import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Helmet } from "@skynoveau-ui/core";

import styles from "./home.module.css";

//technologies images
import ReactImg from "./assets/react-img.png";
import htmlImg from "./assets/html-img.png";
import cssImg from "./assets/css-img.png";
import antImg from "./assets/ant-img.png";
import { NavigationBar } from "@pages/components/navbar";

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
      <div className={`wrapper wrapper-margin-top ${styles.infoWrapper}`}>
        <div className={`container ${styles.infoContainer}`}>
          <div className={`${styles.infoSection}`}>
            <h1 className={`title-40 ${styles.title}`}>
              Make <span>beautiful</span> websites regardless of your design
              experience.
            </h1>
            <p className={`text-18 ${styles.description}`}>
              Sky UI is a collection of components and utilities that are used
              to build modern interfaces
            </p>
            <Button
              className={`text-18 ${styles.exploreButton}`}
              onClick={() => navigate("/components")}
            >
              Explore Components
            </Button>

            {/* ---------- tech stact ---------- */}
            <div className={`wrapper wrapper-margin-top`}>
              <h1 className={`title-30 weight-400 ${styles.stackTitle}`}>
                We used Tech Stack
              </h1>
              <div
                className={`container container-margin-top ${styles.techContainer}`}
              >
                {TECH_STACK.map((item) => {
                  return (
                    <div className={` ${styles.techImageWrapper}`}>
                      <img src={item.image} alt={item.name} />
                      <p className={`text-18 weight-400 ${styles.techName}`}>
                        {item.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
