import { Button, RippleButton, ShineButton } from "@skynoveau-ui/core";

import styles from "./layout.module.css";

export const COMPONENTS_LIST = [
  {
    name: "Button",
    path: "/button",
    variants: [
      {
        name: "Button",
        path: "/button",
        component: (props) => (
          <div className={`${styles.autoLayout}`}>
            <Button {...props}>Basic Button</Button>
            <Button loading={true} {...props}>
              Basic Button
            </Button>
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
];
