import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { PiPlayCircleLight } from "react-icons/pi";
import ReactGA from "react-ga4";

import { useScrollToTop } from "@hooks";
import { TextImageBlock } from "@components/text-image-block/variant-1";
import TestimonialSlider from "./testimonial-slider";
import { Card as CollectionCard } from "./collection-slider/card/index";
import { VideoModal } from "./video-modal";
import { PageSlider } from "./page-slider";

import styles from "./home.module.css";

import ModalVideo from "@assets/home/dhanika-video.mov";
import { useEcommerceStore } from "@app/store";
import { Footer } from "@app/components/footer";
import { Video } from "@components/video";

export default function HomePage({ handleLazyLoadComplete }) {
  const [openVideo, setOpenVideo] = useState(false);
  const loadRef = useRef({ loaded: false });

  const { storedCollections } = useEcommerceStore((state) => ({
    storedCollections: state.storedCollections,
  }));

  useEffect(() => {
    if (!loadRef.current.loaded) {
      handleLazyLoadComplete();
      loadRef.current.loaded = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>
          Buy Budget-Friendly Cotton, and Georgette Sarees | Dhanika
        </title>
        <meta
          name="description"
          content="Explore a wide range of budget-friendly South Indian sarees, including cotton, and hand block printed sarees. Perfect for daily wear and special occasions."
        />
        <meta
          name="keywords"
          content="Sarees, sarees, Budget sarees, Affordable South Indian sarees, Elegant sarees for women, Hand block printed sarees online, Buy budget-friendly sarees online, Affordable hand block printed Kalamkari sarees, South Indian sarees for daily wear and special occasions"
        />
      </Helmet>

      {/* ---------- page banner ---------- */}
      <PageSlider />

      {/* ---------- best collection ---------- */}
      <TextImageBlock />

      {/* ---------- video banner ---------- */}
      <div className={` ${styles.videoPlayerContainer}`}>
        <Video videoSrc={ModalVideo} controls={false} />

        <div className={`${styles.textSection}`}>
          <div
            className={`text-20 ${styles.watchButton}`}
            onClick={() => {
              setOpenVideo(true);
            }}
            id={`sui-aos`}
          >
            <PiPlayCircleLight className={`${styles.icon}`} /> Watch
          </div>
        </div>
      </div>

      {openVideo && (
        <VideoModal
          videoSrc={ModalVideo}
          open={openVideo}
          close={setOpenVideo}
        />
      )}

      {/* ---------- shop by collection ---------- */}
      <div className={`wrapper wrapper-padding ${styles.collectionWrapper}`}>
        <h2
          onClick={() => {
            ReactGA.event({
              category: "Product",
              action: "Click",
              label: "shop by collections checks", // Or other unique identifier
              value: "shop value", // Optional: Send product price if needed
            });
          }}
          className={`text-32 title ${styles.title}`}
          id={`sui-aos`}
        >
          Shop By Collections
        </h2>
        <div
          className={`container container-margin-top ${styles.collectionContainer}`}
        >
          {storedCollections.data.map((item, index) => {
            return (
              <CollectionCard
                key={index}
                imageSrc={item.image}
                alt="dhanika-saree-collection"
                id={item.id}
                title={item.name}
                path={`/collections/${item.id}`}
              />
            );
          })}
        </div>
      </div>

      {/* ---------- testimonials ---------- */}
      <div className={`wrapper wrapper-padding ${styles.testimonialWrapper}`}>
        <h2 className={`text-32 title ${styles.title}`} id={`sui-aos`}>
          Testimonials
        </h2>
        <div className={`container ${styles.testimonialContainer}`}>
          <TestimonialSlider />
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
