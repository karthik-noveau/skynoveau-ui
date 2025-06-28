import { useState } from "react";
import { Button, Loader, RippleButton, ShineButton } from "@skynoveau-ui/core";

import styles from "./layout.module.css";

export const COMPONENTS_LIST = [
  {
    name: "Button",
    path: "/button",
    variants: [
      {
        name: "Button",
        path: "/button",
        componentName: "Button",
        Component: () => {
          return (
            <>
              <Button>Submit</Button>
            </>
          );
        },
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
  {
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
        componentName: "Loader",
        Component: () => {
          const [isClicked, setIsClicked] = useState(false);
          return (
            <>
              <Button loading onClick={() => setIsClicked(!isClicked)}>
                <p className={`text-16`}>Show loader</p>
              </Button>
              {isClicked && (
                <Loader
                  type="fullscreen"
                  size="base"
                  bgColor="var(--black-color)"
                  color="var(--white-color)"
                />
              )}
            </>
          );
        },
      },
    ],
  },
];
