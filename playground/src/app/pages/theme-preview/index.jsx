import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Image, Navbar, NavbarWeb } from "@skynoveau-ui/core";

import styles from "./styles.module.css";

const navConfig = {
  menuList: [
    { label: "Home", path: "/" },
    { label: "About", path: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Design", path: "/theme" },
        { label: "Development", path: "/theme" },
      ],
    },
  ],
};

const LastMenu = () => {
  return (
    <Button style={{ borderRadius: "25px", marginLeft: "10px" }}>
      Contact
    </Button>
  );
};

export default function Theme() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Navbar
        web={
          <NavbarWeb
            layoutType="twoColumn"
            logoRenderer={
              <Image
                onClick={() => navigate("/")}
                width="45px"
                height="45px"
                imgSrc="https://ui.skynoveau.in/assets/skynoveau-ui-logo-CaqDcQwQ.png"
              />
            }
            menuRenderer={
              <NavbarWeb.Menu
                location={location}
                navigate={navigate}
                menuList={navConfig.menuList}
              >
                <LastMenu />
              </NavbarWeb.Menu>
            }
          />
        }
      />

      <div className={`wrapper wrapper-margin-top`}>
        <div className={`container ${styles.aboutContainer}`}>
          <div className={`${styles.leftSection}`}>
            <Image
              width="500px"
              imgSrc="https://grptech.in/static/media/info-img.8ca3de65863780a3a441.jpg"
            />
          </div>
          <div className={`${styles.rightSection}`}>
            <h1 className={`text-32 ${styles.title}`}>Welcome to Skynoveau</h1>
            <p className={`text-18 weight-400 ${styles.subTitle}`}>
              Modern Website Development Services At Low Prices
            </p>
            <p className={`text-16 ${styles.description}`}>
              Searching For Best Website Development Services In India To Create
              A Modern Website For Your Business Or Startup? Take Quick Action
              And Hire RankON Technologies- A Leading Website Development
              Company In India For The Best Website Development Services At
              Affordable Prices.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`wrapper wrapper-margin wrapper-padding ${styles.productsWrapper}`}
      >
        <div className={`container  ${styles.productsContainer}`}>
          <h1 className={`text-32 ${styles.title}`}>Products</h1>

          <div className={`${styles.imagesList}`}>
            <Image
              width="450px"
              height="300px"
              imgSrc="https://grptech.in/static/media/product-1-img.cbaa09ea02dbbfe56029.jpg"
            />
            <Image
              width="450px"
              height="300px"
              imgSrc="https://grptech.in/static/media/product-1-img.cbaa09ea02dbbfe56029.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
