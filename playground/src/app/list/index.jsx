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
        component: (props) => (
          <div className={`${styles.autoLayout} `}>
            <Button {...props}>Basic Button</Button>
            <Button loading={true} {...props}>
              Loading
            </Button>
            <Button disable={true} {...props}>
              Disable
            </Button>
          </div>
        ),
      },
      {
        name: "Ripple Button",
        path: "/ripple-button",
        componentName: "RippleButton",
        component: (props) => (
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
        component: (props) => (
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
        component: () => (
          <div className={`${styles.autoLayout} ${styles["col-3"]}`}>
            <Loader /> <Loader showText={false} />
            <Loader showText={false} color="var(--primary-color)" />
          </div>
        ),
      },
    ],
  },
];
