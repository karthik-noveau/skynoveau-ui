import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";

import styles from "./accordian.module.css";

const ACCORDIAN_LIST = [
  {
    title: "How do I place an order via WhatsApp?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            Placing an order with Dhanika is quick and easy! Here's how:
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            <span>Select your sarees: </span> When you find a saree you love,
            tap on it to see more details.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            <span>Add to cart & order: </span> Tap “Add to cart” and Tap the
            cart icon to review your order. Then tap "Order now"
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            <span>Send WhatsApp message: </span> You will be directed to
            Dhanika’s WhatsApp business along with your cart details. Tap send
            icon.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            <span>Scan and Pay: </span> Once the team receives your order on
            WhatsApp, you will receive a QR scanner to pay.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            <span>Send delivery address: </span> Also send your delivery address
            where you want to receive your order.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            That's it! We'll then deliver your sarees to you.
          </p>
        </div>
      );
    },
  },
  {
    title: "What information should I include in my WhatsApp message?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            Send your cart details.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            Provide your full and accurate delivery address. Include:
          </p>
          <ul className={`text-14 line-2 ${styles.textPaddingTop10}`}>
            <li>Your Full Name</li>
            <li>Street Address</li>
            <li>City</li>
            <li>State</li>
            <li>Pin code</li>
            <li>Landmark (if applicable)</li>
            <li>Phone Number</li>
          </ul>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            Let the team know you're ready to pay by scanning a QR code. You
            could say something like: "Please send me the QR code for payment."
            or "I'm ready to pay, please provide the payment details."
          </p>
        </div>
      );
    },
  },
  {
    title: "How do I know my order has been confirmed?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text}`}>
            Once you place your order through WhatsApp, you'll receive a
            confirmation message with your order details and a unique order ID.
            This confirms that we've received your order and are processing it.
          </p>
        </div>
      );
    },
  },
  {
    title: "What payment methods do you accept?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            At Dhanika, we strive to make your shopping experience as seamless
            as possible. To that end, we currently accept payments through{" "}
            <span>QR codes only</span>. This allows for quick, secure, and
            hassle-free transactions directly from your mobile device.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            We believe this streamlined approach offers the best combination of
            convenience and security for our valued customers.
          </p>
        </div>
      );
    },
  },
  {
    title: "What if I want to change or cancel my order?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            Need to make a change? Here's how it works:
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            Contact us ASAP at +91 9500342171 or +91 9500343171, and we'll
            gladly help you adjust or cancel your order before shipping.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            For full details check our Return and Exchange Policy.
          </p>
        </div>
      );
    },
  },
  {
    title: "How long will it take for my order to arrive?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            We aim to deliver your Dhanika sarees as quickly as possible! Here's
            a timeline:
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            <span>Processing: </span> 2-3 business days.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            <span>Shipping within India: </span> 5-7 business days (standard).
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            You'll receive tracking information once your order is shipped so
            you can follow its journey.
          </p>
        </div>
      );
    },
  },
  {
    title: "What if my saree arrives damaged or is not as described?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            At Dhanika, we're committed to your satisfaction. If your saree
            arrives damaged or isn't as described, please contact us immediately
            after receiving your order.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            Provide your order number and clear photos/videos of the issue for a
            prompt resolution. We'll guide you through the return process and
            offer refund or exchange once the issue is verified.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            <span>Please note: </span> Slight color variations may occur due to
            monitor settings and lighting. We can't accept returns or exchanges
            for worn, washed, or altered sarees.
          </p>
        </div>
      );
    },
  },
  {
    title: "Can I return or exchange my saree?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            Absolutely! We want you to love your Dhanika saree.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            <span>Returns: </span> Return unworn sarees with tags within 10 days
            of receipt for a full refund (return shipping is your
            responsibility). Contact us at +91 9500342171 or +91 9500343171 to
            start the process.
          </p>
          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            <span>Exchanges: </span> We're happy to exchange eligible sarees.
            Contact us and we'll guide you. You'll cover the cost of return
            shipping.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop20}`}
          >
            <span>Please note: </span> Sale items may be final sale, and can't
            be returned or exchanged.
          </p>
        </div>
      );
    },
  },
  {
    title: "Do you offer readymade blouses?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            Currently, Dhanika focuses on offering exquisite sarees and doesn't
            offer readymade blouses. We understand the importance of a
            well-fitted blouse and encourage you to seek customization options
            for the perfect pairing with your Dhanika saree.
          </p>

          <p
            className={`text-14 line-2 ${styles.text} ${styles.textPaddingTop10}`}
          >
            We may offer readymade blouses in the future, so please check back
            for updates!
          </p>
        </div>
      );
    },
  },
  {
    title: "How can I stay updated on promotions and new arrivals?",
    description: () => {
      return (
        <div className={`${styles.faqsDescription}`}>
          <p className={`text-14 line-2 ${styles.text} `}>
            Want to stay in the loop about Dhanika's latest promotions and new
            arrivals? Here's how:
          </p>

          <ul className={`text-14 line-2`}>
            <li>
              <span>Check our website: </span> We constantly update it with new
              collections and offers.
            </li>
            <li>
              <span>Follow us on social media: </span>Instagram, Facebook and
              YouTube. We share sneak peeks and exclusive deals.
            </li>
            <li>
              <span>Join our WhatsApp community: </span>Get instant updates
              delivered to your phone! (Link needs to be added)Get instant
              updates delivered to your phone! (Link needs to be added)
            </li>
          </ul>
        </div>
      );
    },
  },
];

export const Accordian = () => {
  const [selectedList, setSelectedList] = useState(["What is Lorem Ipsum?"]);

  const onMenuClick = (selectedData) => {
    if (selectedList.length) {
      setSelectedList((prev) => {
        if (prev.includes(selectedData.title)) {
          return prev.filter((item) => item !== selectedData.title);
        } else {
          return [...prev, selectedData.title];
        }
      });
    } else {
      let list = [selectedData.title];
      setSelectedList(list);
    }
  };

  return (
    <div className={`${styles.accordianWrapper}`}>
      {ACCORDIAN_LIST.map((item) => {
        return (
          <div className={`${styles.accordianContainer}`} id={`sui-aos`}>
            <div
              className={`${styles.titleSection} ${
                selectedList.includes(item.title) && styles.active
              }`}
              onClick={() => onMenuClick(item)}
            >
              <p className="text-16"> {item.title}</p>
              <SlArrowRight
                className={`${styles.icon} ${
                  selectedList.includes(item.title) && styles.rotateIcon
                }`}
              />
            </div>
            <div
              className={`text-16 weight-400 ${styles.dropdown} ${
                selectedList.includes(item.title) && styles.showDropdown
              }`}
            >
              {item.description()}
            </div>
          </div>
        );
      })}
    </div>
  );
};
