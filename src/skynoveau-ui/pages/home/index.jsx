import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { useScrollToTop } from "@common/hooks/index.jsx";
import { Button } from "@components/button/basic";

import styles from "./sui.home.module.css";

//technologies images
import ReactImg from "./assets/react-img.png";
import htmlImg from "./assets/html-img.png";
import cssImg from "./assets/css-img.png";
import antImg from "./assets/ant-img.png";
import { Navbar } from "@skynoveau-ui/header";

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

export default function SUIHome() {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Modern UI Components for Fast and Responsive Websites | SUI
        </title>
        <meta
          name="description"
          content="Explore SUI (SkyUI) - a powerful frontend UI component system designed to create modern, fast, and responsive websites. Enhance your web development with customizable components."
        />
        <meta
          name="keywords"
          content="UI components, modern UI, frontend UI components, responsive web design, SkyUI system, customizable frontend UI components for modern web development, fast and responsive website design with SkyUI, create modern websites with SkyUI components"
        />
      </Helmet>

      <Navbar />

      {/* ---------- product info ---------- */}
      <div className={`wrapper wrapper-margin-top ${styles.infoWrapper}`}>
        <div
          className={`container container-margin-top ${styles.infoContainer}`}
        >
          <div className={`${styles.infoSection}`}>
            <h1 className={`title-44 weight-500 ${styles.title}`}>
              Make <span>beautiful</span>  websites regardless of your design
              experience.
            </h1>
            <p className={`text-18 ${styles.description}`}>
              Sky UI is a collection of components and utilities that are used
              to build modern interfaces
            </p>
            <Button
              className={`text-16 ${styles.exploreButton}`}
              onClick={() => navigate("/components")}
            >
              Explore Components
            </Button>

            {/* ---------- tech stact ---------- */}
            <div className={`wrapper wrapper-margin-top`}>
              <h1 className={`title-30 weight-400`}>We used Tech Stack</h1>
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

            {/* ---------- footer ---------- */}
            <div className={`wrapper wrapper-margin-top`}>
              <div
                className={`container container-margin-top ${styles.footer}`}
              >
                <p className={`text-18 weight-100`}>Powered by</p>
                <h2
                  className={`text-16 weight-400`}
                  onClick={() => window.open("https://skynoveau.in/", "_blank")}
                >
                  Skynoveau
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
