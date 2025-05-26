import { Skeleton } from "@components/image/placeholder/skeleton";
import styles from "./skeleton.module.css";

export const OrdersSkeleton = () => {
  return (
    <div className={`container`}>
      <div className={`${styles.cartWrapper}`}>
        {[1, 2, 3].map(() => {
          return (
            <div className={`${styles.productCard}`}>
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
    </div>
  );
};
