import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { PageBanner } from "package/react/src/components/banner/page";
import { AOS_ANIMATION } from "@common/aos-animation";
import useWindowWidth, { useScrollToTop } from "@common/hooks";
import { Footer } from "package/react/src/components/footer/default";
import { Slider } from "./Slider";
import { Navbar } from "package/react/src/components/navbar";
import { SizeView } from "./view";
import { FloatButton } from "./float-button";
import { useUiBuilderStore } from "@skynoveau-ui/store/ui.builder.store";

import styles from "./theme.module.css";

import PageBannerImg from "@skynoveau-ui/assets/banner/page/page-banner-img.jpg";
import sectionImg from "@skynoveau-ui/assets/card/new-saree-img.png";

const PRODUCTS = [
  {
    image: sectionImg,
    name: "AI SOFTWARE",
    shortInfo: "AI Software for Advance Configuration with Tools",
    description:
      "All your CNC programming needs—from simple 2-axis milling and turning to complex multi-task machining All your CNC programming needs—from simple 2-axis milling and turning to complex multi-task machining",
  },
  {
    image: sectionImg,
    name: "AI APPLICAION",
    shortInfo: "Programming Software with AI based",
    description:
      "For all your CNC programming needs—from simple 2-axis milling and turning to complex multi-task machining",
    path: "/products/ares-commander",
  },
];

export default function ThemePreview() {
  const { showFontSize } = useUiBuilderStore((state) => ({
    showFontSize: state.showFontSize,
  }));
  const windowWidth = useWindowWidth();

  useScrollToTop();

  return (
    <React.Fragment>
      <Helmet>
        <title> Skynoveau Technology</title>
        <meta
          name="description"
          content="Skynoveau Technologies is a leader in CAD/CAM software solutions, providing expert services and products like Cimatron for MSMEs."
        />
        <meta
          name="keywords"
          content="CAD/CAM Software, Software Reselling, Cimatron Reseller, Leading CAD/CAM Software Solutions, Software Reselling Company Chennai, Cimatron and CAD/CAM Services Chennai, Best CAD/CAM Software Reselling Company in Chennai, Leading Provider of Cimatron and CAD/CAM Solutions for Tooling in Chennai, Reliable CAD/CAM Software for Efficient Manufacturing and Tooling in India"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ---------- navbar ---------- */}
      <Navbar />

      {/* ------------ banner ---------- */}
      <PageBanner
        images={{
          web: {
            src: PageBannerImg,
            alt: "page-banner-img",
          },
        }}
        customContent={() => {
          return (
            <div className={styles.bannerContent}>
              <h1
                className="title-44"
                data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
              >
                <span> Best Software </span>
                for Tooling Productivity
                <SizeView show={showFontSize} name={"title-44"} />
              </h1>
              <p
                className="text-20"
                data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
              >
                Advance Configure Software
                <SizeView show={showFontSize} name={"title-20"} />
              </p>
            </div>
          );
        }}
      />

      {/* -------------- about --------------- */}

      <div className={`text-16 wrapper wrapper-margin-top`}>
        screen size : {windowWidth} px
      </div>
      <div className={`wrapper wrapper-margin-top`}>
        <div className={`container ${styles.aboutInfoContainer}`}>
          <img
            src={sectionImg}
            alt="unisys-about-info"
            data-aos={AOS_ANIMATION.FADE_UP.TYPE}
            data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
          />
          <div className={styles.rightInfo}>
            <h1
              className="title-32"
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              Welcome to Skynoveau Technologies
              <SizeView show={showFontSize} name={"title-32"} />
            </h1>
            <p
              className="text-16"
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              With 16 years of dedicated service, Skynoveau Technologies made
              its initial foray into software reselling with Cimatron in 2018.​​
              Making the right move to follow standards and be responsive to
              customers, Skynoveau was quick to impose its credentials in the
              market. <SizeView show={showFontSize} name={"text-16"} />
            </p>
            <p
              className="text-16"
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              In 2020, the company became an authorized distributor and, thus,
              became one of the leaders in the market. The commitment to
              excellence in the products we deliver and the relationship we
              build with our clients defines our progress and condition that we
              realize through adding value to our portfolio and recognition by
              the industry and our clients.
              <SizeView show={showFontSize} name={"text-16"} />
            </p>
          </div>
        </div>
      </div>

      {/* -------------- counter --------------- */}
      <div
        className={`wrapper wrapper-margin-top`}
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
      >
        <div className={`container ${styles.counterContainer}`}>
          <div className={styles.counterItem}>
            <div className={styles.counter}>50+</div>
            <p className="text-20 weight-400">
              Satisfactory clients
              <SizeView show={showFontSize} name={"text-20"} />
            </p>
          </div>
          <div className={styles.counterItem}>
            <div className={styles.counter}>10+</div>
            <p className="text-20 weight-400">
              Industrial knowledge
              <SizeView show={showFontSize} name={"text-20"} />
            </p>
          </div>
          <div className={styles.counterItem}>
            <div className={styles.counter}>15+</div>
            <p className="text-20 weight-400">
              Experience <SizeView show={showFontSize} name={"text-20"} />
            </p>
          </div>
        </div>
      </div>

      {/* -------------- Products --------------- */}
      <div className={"wrapper wrapper-margin"}>
        <h2
          className={`title-32`}
          data-aos={AOS_ANIMATION.FADE_UP.TYPE}
          data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
        >
          Our Products <SizeView show={showFontSize} name={"title-32"} />
        </h2>
        <div
          className={`container container-margin-top ${styles.productContainer}`}
        >
          {PRODUCTS.map((item) => {
            return (
              <Link to={item.path}>
                <div
                  className={styles.productCard}
                  data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                  data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                >
                  <div className={styles.imgContainer}>
                    <img src={item.image} alt="skyui product" />
                    <div
                      className={styles.textContainer}
                      data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                      data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                    >
                      <p className="text-18">
                        {item.name}
                        <SizeView show={showFontSize} name={"text-18"} />
                      </p>
                      <IoMdArrowForward className={styles.icon} />
                    </div>
                  </div>
                  <div
                    className={`text-20 weight-500 ${styles.shortInfo}`}
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    {item.shortInfo}
                    <SizeView show={showFontSize} name={"text-20"} />
                  </div>
                  <div
                    className="text-16"
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    {item.description}
                    <SizeView show={showFontSize} name={"text-16"} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ---------- list content ---------- */}
      <div
        className={`wrapper wrapper-padding-top wrapper-margin-top ${styles.contentWrapper}`}
      >
        <div className={`container ${styles.contentContainer}`}>
          <h2
            className={`title-30 ${styles.contentTitle}`}
            data-aos={AOS_ANIMATION.FADE_UP.TYPE}
            data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
          >
            Why Cimatron? <SizeView show={showFontSize} name={"title-30"} />
          </h2>
          <ul className={styles.contentList}>
            <li
              className="text-16"
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              <IoMdCheckmarkCircleOutline className={styles.icon} /> Automates
              and refines machining processes for improved productivity and
              accuracy.
              <SizeView show={showFontSize} name={"text-16"} />
            </li>
            <li
              className="text-16"
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              <IoMdCheckmarkCircleOutline className={styles.icon} /> Adapts to
              various industry needs and scales with business growth.
              <SizeView show={showFontSize} name={"text-16"} />
            </li>
            <li
              className="text-16"
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              <IoMdCheckmarkCircleOutline className={styles.icon} /> Backed by
              over 42 years of industry experience and a solid reputation for
              reliability.
              <SizeView show={showFontSize} name={"text-16"} />
            </li>
          </ul>
        </div>
      </div>

      <div className={`wrapper wrapper-padding ${styles.categoriesWrapper}`}>
        <div className={`container ${styles.categoriesContainer}`}>
          <img
            className={styles.leftInfo}
            src={sectionImg}
            alt="new imageasda"
            data-aos={AOS_ANIMATION.FADE_UP.TYPE}
            data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
          />
          <div className={styles.rightInfo}>
            <p
              className={`title-24 weight-500 ${styles.categoryTitle}`}
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              Mold Design <SizeView show={showFontSize} name={"title-24"} />
            </p>
            <p
              className={`text-16 ${styles.categoryDesc}`}
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              Cimatron’s Mold Design software provides an integrated solution
              for designing complex molds with high precision. The advanced
              features make it easy to design for manufacture, create and modify
              mold designs, and design for the time, therefore shortening the
              lead times. <SizeView show={showFontSize} name={"text-16"} />
            </p>
          </div>
        </div>
      </div>

      <div className={`wrapper wrapper-margin`}>
        <h1 className="title-32">
          Testimonials <SizeView show={showFontSize} name={"text-32"} />
        </h1>

        <div className={`container container-margin-top`}>
          <Slider showFontSize={showFontSize} />
        </div>
      </div>
      <Footer />
      <FloatButton />
    </React.Fragment>
  );
}
