import { Skeleton } from "@components/image/placeholder/skeleton";
import styles from "./skeleton.module.css";

export const CartSkeleton = () => {
  return (
    <div className={`wrapper wrapper-margin`}>
      <div className={`container`}>
        <div className={`${styles.cartWrapper}`}>
          <div className={`${styles.leftSection}`}>
            <Skeleton
              width="100%"
              height="20px"
              margin="0 0 30px 0"
              borderRadius="3px"
            />

            {[1, 2, 3, 4].map((item) => {
              return (
                <div key={item} className={`${styles.productCard}`}>
                  <Skeleton width="90px" height="90px" borderRadius="7px" />
                  <div className={`${styles.productInfo}`}>
                    <Skeleton width="100px" height="10px" margin="10px 0 0 0" />
                    <Skeleton width="100px" height="10px" />
                    <Skeleton width="100%" height="20px" margin="15px 0 0 0" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`${styles.rightSection}`}>
            <Skeleton width="150px" height="15px" margin="0 0 20px 0" />

            <Skeleton width="100%" height="10px" margin="0 0 10px 0" />
            <Skeleton width="100%" height="10px" margin="0 0 10px 0" />

            <Skeleton width="100%" height="10px" margin="0 0 10px 0" />

            <Skeleton width="100%" height="25px" margin="20px 0 0 0" />
            <Skeleton width="100%" height="20px" margin="15px 0 0 0" />
          </div>
        </div>
      </div>
    </div>
  );
};
