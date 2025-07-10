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

export const COMPONENTS_LIST = {
  Button: {
    variants: [
      {
        label: "Button",
        name: "Button",
        Component: (props) => <Button {...props}>Submit</Button>,
      },
      {
        label: "Ripple button",
        name: "Button",
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
        name: "Button",
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
  Loader: {
    variants: [
      {
        label: "Loader",
        name: "Loader",
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
        name: "Loader",
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
  Image: {
    variants: [
      {
        label: "Fixed width and height",
        name: "Image",
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
        name: "Image",
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
  PageBanner: {
    variants: [
      {
        label: "Page banner",
        name: "PageBanner",
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
  TextMediaLayout: {
    variants: [
      {
        label: "Right alignment",
        name: "TextMediaLayout",
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
                  Lex Lumière aims to be a trusted legal partner for navigating
                  the complex Indian TMT landscape. We specialize in providing
                  comprehensive legal solutions to international clients seeking
                  to enter or expand their operations in India. True to our
                  name, our team of experienced lawyers is dedicated to
                  enlightening you on the intricacies of Indian law, and
                  empowering you to make informed decisions to best achieve your
                  business objectives.
                </p>
                <br></br>
                <p className={`text-16`}>
                  Lex Lumière aims to be a trusted legal partner for navigating
                  the complex Indian TMT landscape. We specialize in providing
                  comprehensive legal solutions to international clients seeking
                  to enter or expand their operations in India. True to our
                  name, our team of experienced lawyers is dedicated to
                  enlightening you on the intricacies of Indian law, and
                  empowering you to make informed decisions to best achieve your
                  business objectives.
                </p>
              </TextMediaLayout.Content>
            </TextMediaLayout>
          </>
        ),
      },
      {
        label: "Left alignment",
        name: "TextMediaLayout",
        Component: () => (
          <>
            <TextMediaLayout breakPoint="900" layout={["auto", "400px"]}>
              <TextMediaLayout.Content>
                <p className={`text-16`}>
                  Lex Lumière aims to be a trusted legal partner for navigating
                  the complex Indian TMT landscape. We specialize in providing
                  comprehensive legal solutions to international clients seeking
                  to enter or expand their operations in India. True to our
                  name, our team of experienced lawyers is dedicated to
                  enlightening you on the intricacies of Indian law, and
                  empowering you to make informed decisions to best achieve your
                  business objectives.
                </p>
                <br></br>
                <p className={`text-16`}>
                  Lex Lumière aims to be a trusted legal partner for navigating
                  the complex Indian TMT landscape. We specialize in providing
                  comprehensive legal solutions to international clients seeking
                  to enter or expand their operations in India. True to our
                  name, our team of experienced lawyers is dedicated to
                  enlightening you on the intricacies of Indian law, and
                  empowering you to make informed decisions to best achieve your
                  business objectives.
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
  Text: {
    variants: [
      {
        label: "Text",
        name: "Text",
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
  Accordian: {
    variants: [
      {
        label: "Accordian",
        name: "Accordian",
        Component: () => <></>,
      },
    ],
  },
  Slider: {
    variants: [
      {
        label: "Accordian",
        name: "Accordian",
        Component: () => <></>,
      },
    ],
    subComponents: {
      FullWidth: {
        variants: [
          {
            label: "Full width",
            name: "Full width",
            Component: () => <></>,
          },
        ],
      },
      CustomWidth: {
        variants: [
          {
            label: "Custom width",
            name: "Custom width",
            Component: () => <></>,
          },
        ],
      },
    },
  },
  Cards: {
    variants: [
      {
        label: "Cards",
        name: "Cards",
        Component: () => <></>,
      },
    ],
  },
  InputFields: {
    variants: [
      {
        label: "Cards",
        name: "Cards",
        Component: () => <></>,
      },
    ],
  },
  NavBar: {
    variants: [
      {
        label: "Cards",
        name: "Cards",
        Component: () => <></>,
      },
    ],
  },
  Footer: {
    variants: [
      {
        label: "Cards",
        name: "Cards",
        Component: () => <></>,
      },
    ],
  },
  ContactForm: {
    variants: [
      {
        label: "Cards",
        name: "Cards",
        Component: () => <></>,
      },
    ],
  },
  Table: {
    variants: [
      {
        label: "Table",
        name: "Table",
        Component: () => <></>,
      },
    ],
  },
  Pagination: {
    variants: [
      {
        label: "Pagination",
        name: "Pagination",
        Component: () => <></>,
      },
    ],
  },
  Toast: {
    subComponents: {
      Toast: {
        variants: [
          {
            label: "Cards",
            name: "Cards",
            Component: () => <></>,
          },
        ],
      },
      CompactToast: {
        variants: [
          {
            label: "Cards",
            name: "Cards",
            Component: () => <></>,
          },
        ],
      },
    },
  },
  Tabs: {
    variants: [
      {
        label: "Cards",
        name: "Cards",
        Component: () => <></>,
      },
    ],
  },
};
