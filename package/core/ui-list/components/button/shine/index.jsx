import { LOADER_SIZE } from "../../loader/constant";
import { BaseButton } from "../../button/base/index.jsx";
import { Loader } from "../../loader";

import styles from "./button.module.css";

const ShineButton = (props) => {
  const { children, loading, onClick, className, ...rest } = props;

  return (
    <>
      <BaseButton
        className={`${!props?.disable && styles.shineEffect} ${className}`}
        onClick={onClick}
        loading={loading}
        {...rest}
      >
        {loading && (
          <span className={`${styles.loaderContainer}`}>
            <Loader
              showText={false}
              size={LOADER_SIZE.TINY}
              color="var(--white-color)"
            />
          </span>
        )}
        {children}
      </BaseButton>
    </>
  );
};

export default ShineButton;
