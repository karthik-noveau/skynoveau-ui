import React from "react";
import { Helmet } from "react-helmet";

import useWindowWidth, { useScrollToTop } from "@hooks";
import { PageBanner } from "@components/banner/page";
import { Footer } from "@app/components/footer";

import styles from "./about.module.css";

import AboutBannerImg from "@assets/about/about-banner-img.jpg";
import CollageWeb from "@assets/about/collage-web.png";
import CollageMobile from "@assets/about/collage-mobile.png";

export default function About() {
  const windowWidth = useWindowWidth();
  const collageImg = windowWidth < 500 ? CollageMobile : CollageWeb;

  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>History of Traditional South Indian Sarees | Dhanika</title>
        <meta
          name="description"
          content="Discover the legacy and craftsmanship behind South Indian sarees, including hand block printed Kalamkari and traditional Indian saree styles."
        />
        <meta
          name="keywords"
          content="Saree history, South Indian saree, Traditional sarees, History of South Indian sarees, The art of hand block printing, Traditional Indian saree craftsmanship, Story behind South Indian cotton sarees, The legacy of Kalamkari hand block printed sarees, Traditional South Indian saree craftsmanship and heritage"
        />
      </Helmet>

      {/* ------- page banner ------------ */}
      <PageBanner content="About Us" imageSrc={AboutBannerImg} />

      <div className={`wrapper `}>
        <div className={`container container-margin ${styles.aboutContainer}`}>
          <h1 className={`text-32 ${styles.title}`} id={`sui-aos`}>
            Dhanika Sarees: Where Tradition evolves
          </h1>
          <div className={`${styles.content}`}>
            <p className={`text-16 line-2`} id={`sui-aos`}>
              Dhanika Sarees was born in Chennai, the saree capital of the
              South. We are more than just a saree brand; we are storytellers,
              weaving tales of artistry and tradition into this cultural
              garment.
            </p>
            <p className={`text-16 line-2`} id={`sui-aos`}>
              Our journey began with a deep reverence for the artisans – the
              magic of hand block printing and the intricate beauty of
              Kalamkari. Each saree is a canvas, painted with the vibrant hues
              of nature and adorned with motifs that echo ancient art.
            </p>
            <p className={`text-16 line-2`} id={`sui-aos`}>
              We believe in the handloom, a symbol of India's rich textile
              legacy. Our handloom sarees stand testament to the dedication and
              patience of weavers who transform simple yarns into exquisite
              masterpieces with soul.
            </p>
            <p className={`text-16 line-2`} id={`sui-aos`}>
              At Dhanika, tradition is not static; it evolves. We embrace the
              changing times by blending classic techniques with modern
              sensibilities and comfort. Our designs capture the essence of
              today's woman – confident, independent, and rooted in her
              heritage.
            </p>
            <p className={`text-16 line-2`} id={`sui-aos`}>
              When you wear a Dhanika saree, you're not just draping a fabric.
              You drape the labour of artisans, beautiful ancient art, tradition
              that is evergreen.
            </p>
          </div>
        </div>
      </div>

      <div className={`wrapper wrapper-margin-bottom`}>
        <div className={`container ${styles.collageContainer}`}>
          <img src={collageImg} alt="dhanika-saree-collage" id={`sui-aos`} />
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
