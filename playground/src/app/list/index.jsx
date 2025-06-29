import { useState } from "react";
import {
  Button,
  Loader,
  PageBanner,
  RippleButton,
  ShineButton,
} from "@skynoveau-ui/core";

import styles from "./layout.module.css";

export const COMPONENTS_LIST = {
  button: {
    name: "Button",
    path: "/button",
    variants: [
      {
        name: "Button",
        path: "/button",
        componentName: "Button",
        Component: (props) => <Button {...props}>Submit</Button>,
      },
      {
        name: "Ripple Button",
        path: "/ripple-button",
        componentName: "RippleButton",
        Component: (props) => (
          <div className={`${styles.autoLayout}`}>
            <RippleButton {...props}>Ripple Effect</RippleButton>
            <RippleButton loading={true} {...props}>
              Loading
            </RippleButton>
          </div>
        ),
      },
      {
        name: "Shine Button",
        path: "/shine-button",
        componentName: "ShineButton",
        Component: (props) => (
          <div className={`${styles.autoLayout}`}>
            <ShineButton {...props}>Shine Effect</ShineButton>
            <ShineButton loading={true} {...props}>
              Loading
            </ShineButton>
          </div>
        ),
      },
    ],
  },
  loader: {
    name: "Loader",
    path: "/loader",
    variants: [
      {
        name: "Loader",
        path: "/loader",
        componentName: "Loader",
        Component: () => (
          <div className={`${styles.autoLayout}`}>
            <Loader loading={true} size="base" />
            <Loader loading={true} size="medium" />
            <Loader loading={true} size="small" />
            <Loader loading={true} size="tiny" />
          </div>
        ),
      },
      {
        name: "Fullscreen Loader",
        path: "/fullscreen-loader",
        componentName: `Loader`,
        Component: () => {
          const [loaderType, setLoaderType] = useState(null);
          const LOADER_TYPES = { default: "default", customized: "customized" };

          return (
            <div className={`${styles.autoLayout}`}>
              <Button
                onClick={() => {
                  setLoaderType(LOADER_TYPES.default);
                }}
              >
                <p className={`text-14`}>Default Loader</p>
              </Button>
              <Button
                onClick={() => {
                  setLoaderType(LOADER_TYPES.customized);
                }}
              >
                <p className={`text-14`}>Customized Loader</p>
              </Button>
              {loaderType === LOADER_TYPES.default && (
                <Loader type="fullscreen" size="base" />
              )}

              {loaderType === LOADER_TYPES.customized && (
                <Loader
                  type="fullscreen"
                  size="base"
                  bgColor="var(--black-color)"
                  color="var(--white-color)"
                />
              )}
            </div>
          );
        },
      },
    ],
  },
  pageBanner: {
    name: "pageBanner",
    path: "/page-banner",
    variants: [
      {
        name: "PageBanner",
        path: "/page-banner",
        componentName: "PageBanner",
        Component: () => (
          <PageBanner
            title="About"
            description="Let's start to know about us"
          />
        ),
      },
    ],
  },
};
