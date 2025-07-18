import { useState } from "react";
import {
  Button,
  Description,
  Image,
  Item,
  List,
  Loader,
  PageBanner,
  RippleButton,
  ShineButton,
  Text,
  TextMediaLayout,
  Title,
} from "@skynoveau-ui/core";

import styles from "./layout.module.css";

export let COMPONENTS_LIBRARY = {
  General: {
    ["button"]: {
      variants: [
        {
          label: "Button",
          Component: (props) => <Button {...props}>Submit</Button>,
        },
        {
          label: "Ripple button",
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
          label: "Shine button",
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
    ["loader"]: {
      variants: [
        {
          label: "Loader",
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
          label: "Fullscreen loader",
          Component: () => {
            const [loaderType, setLoaderType] = useState(null);
            const LOADER_TYPES = {
              default: "default",
              customized: "customized",
            };

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
    ["image"]: {
      variants: [
        {
          label: "Fixed width and height",
          Component: () => (
            <Image
              width="400px"
              height="250px"
              borderRadius="8px"
              imgSrc="https://lexlumiere.com/static/media/vission.be56f36746e44057ede1.jpg"
            />
          ),
        },
        {
          label: "Parent width and height",
          Component: () => (
            <div style={{ width: "400px", height: "250px" }}>
              <Image
                borderRadius="8px"
                imgSrc="https://lexlumiere.com/static/media/vission.be56f36746e44057ede1.jpg"
              />
            </div>
          ),
        },
      ],
    },
    ["text"]: {
      variants: [
        {
          label: "Text",
          Component: () => (
            <>
              <Text>
                <Title>The Cimatron</Title>
                <Description className="text-16 weight-300">
                  Cimatron is a powerful CAD/CAM software designed to streamline
                  the manufacturing process by integrating computer-aided design
                  and computer-aided manufacturing into a
                </Description>
                <Description className="text-16 weight-300">
                  Cimatron is a powerful CAD/CAM software designed to streamline
                  the manufacturing process by integrating computer-aided design
                  and computer-aided manufacturing into a
                </Description>
              </Text>
              <Text>
                <Title>The Cimatron</Title>
                <Description className="text-16 weight-300">
                  Cimatron is a powerful CAD/CAM software designed to streamline
                  the manufacturing process by integrating computer-aided design
                  and computer-aided manufacturing into a
                </Description>
                <List>
                  <Item title="What is cimatron ?">Product one</Item>
                  <Item title="What is cimatron ?">Product</Item>
                  <Item title="What is cimatron ?">Product three</Item>
                </List>

                <List>
                  <Item>Product one</Item>
                  <Item>Product two</Item>
                  <Item>Product three</Item>
                </List>
              </Text>

              <Text>
                <Description className="text-16 weight-300">
                  Cimatron is a powerful CAD/CAM software designed to streamline
                  the manufacturing process by integrating computer-aided design
                  and computer-aided manufacturing into a
                </Description>
                <List>
                  <Item>list 1</Item>
                  <Item>list 2</Item>
                  <Item>list 3</Item>
                </List>
              </Text>
            </>
          ),
        },
      ],
    },
    ["input fields"]: {
      variants: [
        {
          label: "Cards",
          Component: () => <></>,
        },
      ],
    },
    ["alert"]: {
      subComponents: {
        ["toast"]: {
          variants: [
            {
              label: "Cards",
              Component: () => <></>,
            },
          ],
        },
        ["message"]: {
          variants: [
            {
              label: "Cards",
              Component: () => <></>,
            },
          ],
        },
      },
    },
    ["table"]: {
      variants: [
        {
          label: "Table",
          Component: () => <></>,
        },
      ],
    },
    ["accordian"]: {
      variants: [
        {
          label: "Accordian",
          Component: () => <></>,
        },
      ],
    },
    ["slider"]: {
      subComponents: {
        ["full width"]: {
          variants: [
            {
              label: "Full width",
              Component: () => <></>,
            },
          ],
        },
        ["custom width"]: {
          variants: [
            {
              label: "Custom width",
              Component: () => <></>,
            },
          ],
        },
      },
    },
  },
  Layout: {
    ["text-media layout"]: {
      variants: [
        {
          label: "Right alignment",
          Component: () => (
            <>
              <TextMediaLayout breakPoint="900" layout={["400px", "auto"]}>
                <TextMediaLayout.Media
                  breakPointConfig={[{ 900: "450px" }, { 480: "90%" }]}
                >
                  <Image
                    // placeholder={false}
                    aspectRatio="832/735"
                    borderRadius="12px"
                    imgSrc="https://lexlumiere.com/static/media/about-img.54debc0d9d79e2703e4b.jpg"
                  />
                </TextMediaLayout.Media>
                <TextMediaLayout.Content>
                  <p className={`text-16`}>
                    Lex Lumière aims to be a trusted legal partner for
                    navigating the complex Indian TMT landscape. We specialize
                    in providing comprehensive legal solutions to international
                    clients seeking to enter or expand their operations in
                    India. True to our name, our team of experienced lawyers is
                    dedicated to enlightening you on the intricacies of Indian
                    law, and empowering you to make informed decisions to best
                    achieve your business objectives.
                  </p>
                  <br></br>
                  <p className={`text-16`}>
                    Lex Lumière aims to be a trusted legal partner for
                    navigating the complex Indian TMT landscape. We specialize
                    in providing comprehensive legal solutions to international
                    clients seeking to enter or expand their operations in
                    India. True to our name, our team of experienced lawyers is
                    dedicated to enlightening you on the intricacies of Indian
                    law, and empowering you to make informed decisions to best
                    achieve your business objectives.
                  </p>
                </TextMediaLayout.Content>
              </TextMediaLayout>
            </>
          ),
        },
        {
          label: "Left alignment",
          Component: () => (
            <>
              <TextMediaLayout breakPoint="900" layout={["auto", "400px"]}>
                <TextMediaLayout.Content>
                  <p className={`text-16`}>
                    Lex Lumière aims to be a trusted legal partner for
                    navigating the complex Indian TMT landscape. We specialize
                    in providing comprehensive legal solutions to international
                    clients seeking to enter or expand their operations in
                    India. True to our name, our team of experienced lawyers is
                    dedicated to enlightening you on the intricacies of Indian
                    law, and empowering you to make informed decisions to best
                    achieve your business objectives.
                  </p>
                  <br></br>
                  <p className={`text-16`}>
                    Lex Lumière aims to be a trusted legal partner for
                    navigating the complex Indian TMT landscape. We specialize
                    in providing comprehensive legal solutions to international
                    clients seeking to enter or expand their operations in
                    India. True to our name, our team of experienced lawyers is
                    dedicated to enlightening you on the intricacies of Indian
                    law, and empowering you to make informed decisions to best
                    achieve your business objectives.
                  </p>
                </TextMediaLayout.Content>
                <TextMediaLayout.Media
                  breakPointConfig={[{ 900: "450px" }, { 480: "90%" }]}
                >
                  <Image
                    aspectRatio="43/38"
                    borderRadius="12px"
                    imgSrc="https://lexlumiere.com/static/media/about-img.54debc0d9d79e2703e4b.jpg"
                  />
                </TextMediaLayout.Media>
              </TextMediaLayout>
            </>
          ),
        },
      ],
    },
    ["page banner"]: {
      variants: [
        {
          label: "Page banner",
          Component: () => (
            <div>
              <PageBanner
                title="About"
                description="Let's start to know about us"
              />
            </div>
          ),
        },
      ],
    },
    ["cards"]: {
      variants: [
        {
          label: "Cards",
          Component: () => <></>,
        },
      ],
    },
  },
  Navigation: {
    ["navbar"]: {
      subComponents: {
        ["nav web"]: {
          variants: [
            {
              label: "Cards",
              Component: () => <></>,
            },
          ],
        },
        ["nav mobile"]: {
          variants: [
            {
              label: "Cards",
              Component: () => <></>,
            },
          ],
        },
      },
    },
    ["pagination"]: {
      variants: [
        {
          label: "Pagination",
          Component: () => <></>,
        },
      ],
    },
    ["tabs"]: {
      variants: [
        {
          label: "Cards",
          Component: () => <></>,
        },
      ],
    },
  },
  Template: {
    ["footer"]: {
      variants: [
        {
          label: "Cards",
          Component: () => <></>,
        },
      ],
    },
    ["contact form"]: {
      variants: [
        {
          label: "Cards",
          Component: () => <></>,
        },
      ],
    },
  },
};
const flattenComponents = (components) => {
  const flat = {};

  for (const category of Object.values(components)) {
    for (const [key, value] of Object.entries(category)) {
      flat[key] = value;
    }
  }

  return flat;
};

export const COMPONENTS_LIST = flattenComponents(COMPONENTS_LIBRARY);
