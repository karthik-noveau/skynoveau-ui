import { Skeleton } from "@components/image/placeholder/skeleton";
import styles from "./skeleton.module.css";

export const CheckoutSkeleton = () => {
  return (
    <div className={`wrapper wrapper-margin`}>
      <div className={`container`}>
        <div className={`${styles.cartWrapper}`}>
          <div className={`${styles.leftSection}`}>
            <Skeleton
              width="200px"
              height="20px"
              margin="0 0 30px 0"
              borderRadius="3px"
            />
            {[1, 2, 3].map(() => {
              return (
                <>
                  <Skeleton
                    width="150px"
                    height="15px"
                    margin="40px 0 20px 0"
                    borderRadius="3px"
                  />
                  <Skeleton
                    width="100%"
                    height="25px"
                    margin="0 0 20px 0"
                    borderRadius="3px"
                  />
                  <Skeleton
                    width="100%"
                    height="25px"
                    margin="0 0 20px 0"
                    borderRadius="3px"
                  />
                  <Skeleton
                    width="100%"
                    height="25px"
                    margin="0 0 20px 0"
                    borderRadius="3px"
                  />
                </>
              );
            })}
            <Skeleton
              width="50%"
              height="20px"
              margin="30px 0 30px 0"
              borderRadius="3px"
            />
          </div>

          <div className={`${styles.rightSection}`}>
            <Skeleton width="100%" height="20px" margin="50px 0 20px 0" />
            {[1, 2].map(() => {
              return (
                <div className={`${styles.productCard}`}>
                  <Skeleton
                    width="90px"
                    height="90px"
                    borderRadius="7px"
                    margin="10px 0 0 0"
                  />
                  <div className={`${styles.productInfo}`}>
                    <Skeleton width="100%" height="15px" margin="10px 0 0 0" />
                    <Skeleton width="100%" height="10px" />
                  </div>
                </div>
              );
            })}
            <Skeleton
              width="100%"
              height="15px"
              margin="30px 0 0 0"
              borderRadius="3px"
            />
            <Skeleton
              width="100%"
              height="15px"
              margin="20px 0 0 0"
              borderRadius="3px"
            />
            <Skeleton
              width="100%"
              height="15px"
              margin="20px 0 0 0"
              borderRadius="3px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
