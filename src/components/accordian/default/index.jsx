import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight } from "react-icons/sl";

import styles from "./accordian.module.css";

export const Accordian = ({ data = DATA }) => {
  const [selectedList, setSelectedList] = useState(["What is Lorem Ipsum?"]);
  const dropdownRefs = useRef({});

  // Use useEffect to set the height for the initially opened accordion
  useEffect(() => {
    selectedList.forEach((title) => {
      const dropdown = dropdownRefs.current[title];
      if (dropdown) {
        dropdown.style.height = `${dropdown.scrollHeight}px`;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getDropdownStyle = (title) => {
    return {
      height: selectedList.includes(title)
        ? `${dropdownRefs.current[title]?.scrollHeight}px`
        : "0px",
      transition: "height 0.3s",
    };
  };

  return (
    <div className={`${styles.accordianWrapper}`}>
      {data.map((item) => {
        return (
          <div className={`${styles.accordianContainer}`} id={`sui-aos`}>
            <div
              className={`${styles.titleSection} ${
                selectedList.includes(item.title) && styles.active
              }`}
              onClick={() => onMenuClick(item)}
            >
              <p className="text-14"> {item.title}</p>
              <SlArrowRight
                className={`${styles.icon} ${
                  selectedList.includes(item.title) && styles.rotateIcon
                }`}
              />
            </div>
            <div
              className={`text-14 ${styles.dropdown} ${
                selectedList.includes(item.title) && styles.showDropdown
              }`}
              style={getDropdownStyle(item.title)}
              ref={(el) => (dropdownRefs.current[item.title] = el)} // Store ref for each dropdown
              id={item.title} // Set the ID to target specific element
            >
              {item.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

let DATA = [
  {
    title: "What is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Why do we use it?",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    title: "Where does it come from?",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    title: "Where can I get some?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
  {
    title: "Where does it come from? new ",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    title: "Where can I get some? new",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
];
