// ---------- accordian ----------
import { Accordian } from "skynoveau-ui/accordian/default";
import { Maintenance as ImageMaintenance } from "skynoveau-ui/banner/maintenance/image-render";
import { Maintenance as VideoMaintenance } from "skynoveau-ui/banner/maintenance/video-render";
// ---------- banner ----------
import { PageBanner } from "skynoveau-ui/banner/page";
import { ParallaxBanner } from "skynoveau-ui/banner/parallax";
// ---------- button ----------
import { Button as BasicButton } from "skynoveau-ui/button/basic";
import { Button as RippleButton } from "skynoveau-ui/button/ripple";
import { Button as ShineButton } from "skynoveau-ui/button/shine";
// ---------- card layout ----------
import { CardComponent as CardSingleInsideText } from "skynoveau-ui/card/single-layout/arrow-icon";
import { CardComponent as CardSplitArrow } from "skynoveau-ui/card/split-layout/text-inside";
import { ContactComponent as ContactAddressForm } from "skynoveau-ui/contact/contact-form";
// ---------- contact ----------
import { ContactComponent as ContactSplitForm } from "skynoveau-ui/contact/split-form";
// ---------- cursor ----------
import { CustomCursor } from "skynoveau-ui/cursor";
// ---------- footer ----------
import { Footer } from "skynoveau-ui/footer/default";
import { Footer as FooterSquareLogo } from "skynoveau-ui/footer/square-logo";
// ---------- google map ----------
import { GoogleMap } from "skynoveau-ui/google-map";
// ---------- loader ----------
import { Loader as BasicLoader } from "skynoveau-ui/loader/basic";
import { Loader as BasicCompactLoader } from "skynoveau-ui/loader/basic/compact";
import { Loader as BasicFullscreenLoader } from "skynoveau-ui/loader/basic/fullscreen";
import { Loader as LogoCircleLoader } from "skynoveau-ui/loader/logo-circle";
// ---------- modal ----------
import { Modal as ModalVariant1 } from "skynoveau-ui/modal/video";
// ---------- Hamburger Menu ----------
import { HamburgerMenu as HamburgerMenuVariant1 } from "skynoveau-ui/navbar/hamburger/variant-1/inxdex";
import { HamburgerMenu as HamburgerMenuVariant2 } from "skynoveau-ui/navbar/hamburger/variant-2/inxdex";
import { HamburgerMenu as HamburgerMenuVariant3 } from "skynoveau-ui/navbar/hamburger/variant-3/inxdex";
// ---------- Navbar mobile ----------
import { NavbarMobile as NavbarMobileBottomVariant1 } from "skynoveau-ui/navbar/mobile/bottom-dropdown/variant-1";
import { NavbarMobile as NavbarMobileCircleVariant1 } from "skynoveau-ui/navbar/mobile/circle-no-dropdown";
import { NavbarMobile as NavbarMobileRightVariant1 } from "skynoveau-ui/navbar/mobile/right-dropdown/default";
import { NavbarWeb as NavbarWebVariant2 } from "skynoveau-ui/navbar/web/center";
// ---------- Navbar web ----------
import { NavbarWeb as NavbarWebVariant1 } from "skynoveau-ui/navbar/web/default";
// ---------- pageNotFound ----------
import PageNotFound from "skynoveau-ui/page-not-found";
// ---------- scroll widgets ----------
import { BackButton } from "skynoveau-ui/scroll-widget/back-button/variant-1";
import { DownButton } from "skynoveau-ui/scroll-widget/down-button/variant-1";
// ---------- slider ----------
import { Slider as GeneralSliderVariant1 } from "skynoveau-ui/slider/card-slider/variant-1";
// ---------- tesitmonial ----------
import { Slider as TestimonialSliderVariant1 } from "skynoveau-ui/slider/testimonial/variant-1";
// ---------- TextImageBlock ----------
import { TextImageBlock } from "skynoveau-ui/text-image-section/variant-1";
// ---------- whatsapp ----------
import { WhatsApp } from "skynoveau-ui/whatsapp";

import styles from "./renderer.override.module.css";

export const COMPONENTS_LIST = [
  {
    name: "Button",
    path: "/button",
    variants: [
      {
        name: "Basic Button",
        path: "/basic-button",
        component: (props) => (
          <div className={`${styles.autoLayout}`}>
            <BasicButton {...props}>Basic Button</BasicButton>
            <BasicButton loading={true} {...props}>
              Basic Button
            </BasicButton>
          </div>
        ),
      },
      {
        name: "Ripple Button",
        path: "/ripple-button",
        component: (props) => (
          <div className={`${styles.autoLayout}`}>
            <RippleButton {...props}>Ripple Effect</RippleButton>
            <RippleButton loading={true} {...props}>
              Ripple Effect
            </RippleButton>
          </div>
        ),
      },
      {
        name: "Shine Button",
        path: "/shine-button",
        component: (props) => (
          <div className={`${styles.autoLayout}`}>
            <ShineButton {...props}>Shine Effect</ShineButton>
            <ShineButton loading={true} {...props}>
              Shine Effect
            </ShineButton>
          </div>
        ),
      },
    ],
  },
  {
    name: "Loader",
    path: "/loader",
    variants: [
      {
        name: "Basic Loader",
        path: "/basic",
        className: styles.heightFit,
        component: (props) => {
          return (
            <div className={`${styles.autoLayout}`}>
              <BasicLoader {...props} />
              <BasicLoader showText={false} {...props} />
            </div>
          );
        },
      },
      {
        name: "Basic Compact Loader",
        path: "/basic-compact-loader",
        className: styles.positionSticky,
        component: (props) => <BasicCompactLoader {...props} />,
      },
      {
        name: "Basic Fullscreen Loader",
        path: "/basic-fullscreen-loader",
        component: (props) => (
          <BasicFullscreenLoader isLoading={true} {...props} />
        ),
      },
      {
        name: "Logo Circle Loader",
        path: "/logo-circle-loader",
        className: styles.positionSticky,
        component: (props) => <LogoCircleLoader {...props} />,
      },
    ],
  },
  {
    name: "HamburgerMenu",
    path: "/hamburger-menu",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        component: (props) => (
          <div>
            <HamburgerMenuVariant1 {...props} />
          </div>
        ),
      },
      {
        name: "variant 2",
        path: "/variant-2",
        component: (props) => <HamburgerMenuVariant2 {...props} />,
      },
      {
        name: "variant 3",
        path: "/variant-3",
        component: (props) => <HamburgerMenuVariant3 {...props} />,
      },
    ],
  },
  {
    name: "Navigation Bar",
    path: "/navigation-bar",
    categories: [
      {
        name: "Web",
        path: "/web",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <NavbarWebVariant1 {...props} />,
          },
          {
            name: "variant 2",
            path: "/variant-2",
            className: styles.positionSticky,
            component: (props) => <NavbarWebVariant2 {...props} />,
          },
        ],
      },
      {
        name: "Mobile Bottom Dropdown",
        path: "/mobile-bottom-dropdown",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <NavbarMobileBottomVariant1 {...props} />,
          },
        ],
      },
      {
        name: "Mobile Right Dropdown",
        path: "/mobile-right-dropdown",
        variants: [
          {
            name: "Mobile Right Dropdown - variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <NavbarMobileRightVariant1 {...props} />,
          },
        ],
      },
      {
        name: "Mobile No Dropdown",
        path: "/mobile-no-dropdown",
        variants: [
          {
            name: "Mobile No Dropdown - variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <NavbarMobileCircleVariant1 {...props} />,
          },
        ],
      },
    ],
  },
  {
    name: "Footer",
    path: "/footer",
    variants: [
      {
        name: "default",
        path: "/default",
        component: () => <Footer />,
      },
      {
        name: "square logo",
        path: "/square-logo",
        component: () => <FooterSquareLogo />,
      },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    variants: [
      {
        name: "Split Form",
        path: "/split-form",
        className: styles.heightMax,
        component: (props) => <ContactSplitForm {...props} />,
      },
      {
        name: "Contact Form",
        path: "/contact-form",
        className: styles.heightMax,
        component: (props) => <ContactAddressForm {...props} />,
      },
    ],
  },
  {
    name: "Text Image Block",
    path: "/text-image-block",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        component: (props) => <TextImageBlock {...props} />,
      },
    ],
  },
  {
    name: "Banner",
    path: "/banner",
    categories: [
      {
        name: "Page Banner",
        path: "/page-banner",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <PageBanner content="Home" {...props} />,
          },
        ],
      },
      {
        name: "Maintenance Banner",
        path: "/maintenance-banner",
        variants: [
          {
            name: "video",
            path: "/video",
            className: `${styles.positionSticky} ${styles.heightMax}`,
            component: (props) => <VideoMaintenance {...props} />,
          },
          {
            name: "image",
            path: "/image",
            className: `${styles.positionSticky} ${styles.heightMax}`,
            component: (props) => <ImageMaintenance {...props} />,
          },
        ],
      },
      {
        name: "Parallax Banner",
        path: "/parallax-banner",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <ParallaxBanner {...props} />,
          },
        ],
      },
    ],
  },
  {
    name: "Card",
    path: "/card",
    categories: [
      {
        name: "Single Layout",
        path: "/single-layout",
        variants: [
          {
            name: "inside text",
            path: "/inside-text",
            component: (props) => <CardSingleInsideText {...props} />,
          },
        ],
      },
      {
        name: "Split Layout",
        path: "/split-layout",
        variants: [
          {
            name: "arrow icon",
            path: "/arrow-icon",
            component: (props) => <CardSplitArrow {...props} />,
          },
        ],
      },
    ],
  },

  {
    name: "Slider",
    path: "/slider",
    categories: [
      {
        name: "Testimonial",
        path: "/testimonial",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.heightFit,
            component: (props) => <TestimonialSliderVariant1 {...props} />,
          },
        ],
      },
      {
        name: "Card",
        path: "/general",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            component: (props) => <GeneralSliderVariant1 {...props} />,
          },
        ],
      },
    ],
  },
  {
    name: "Accordian",
    path: "/accordian",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        component: (props) => <Accordian {...props} />,
      },
    ],
  },
  {
    name: "Modal",
    path: "/modal",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        component: (props) => <ModalVariant1 {...props} />,
      },
    ],
  },
  {
    name: "WhatsApp",
    path: "/whatspp",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        className: styles.positionSticky,
        component: (props) => <WhatsApp {...props} />,
      },
    ],
  },
  {
    name: "Page Not Found",
    path: "/page-not-found",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        className: styles.heightFit,
        component: (props) => <PageNotFound {...props} />,
      },
    ],
  },
  {
    name: "Google Map",
    path: "/google-map",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        component: (props) => <GoogleMap {...props} />,
      },
    ],
  },
  {
    name: "Scroll Widgets",
    path: "/scroll-widgets",
    categories: [
      {
        name: "Back Button",
        path: "/back-button",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <BackButton {...props} />,
          },
        ],
      },
      {
        name: "Down Button",
        path: "/down-button",
        variants: [
          {
            name: "variant 1",
            path: "/variant-1",
            className: styles.positionSticky,
            component: (props) => <DownButton {...props} />,
          },
        ],
      },
    ],
  },
  {
    name: "Cursor",
    path: "/cursor",
    variants: [
      {
        name: "variant 1",
        path: "/variant-1",
        component: (props) => <CustomCursor {...props} />,
      },
    ],
  },
];
