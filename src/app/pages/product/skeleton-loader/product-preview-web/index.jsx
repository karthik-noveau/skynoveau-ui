import { Skeleton } from "@components/image/placeholder/skeleton";
import styles from "./skeleton.module.css";

export const ProductWebSkeleton = () => {
  return (
    <div className="wrapper wrapper-margin-top ">
      <div className={`container`}>
        <div className={`${styles.section}`}>
          <div className={`${styles.leftSection}`}>
            <div className={`${styles.cardContainer}`}>
              {[1, 2, 3, 4, 5].map(() => {
                return (
                  <div className={`${styles.card}`}>
                    <Skeleton
                      borderRadius="7px"
                      className={styles.cardSkeleton}
                    />
                  </div>
                );
              })}
            </div>
            <Skeleton width="100%" height="100%" />
          </div>
          <div className={`${styles.rightSection}`}>
            <Skeleton width="100%" height="20px" />
            <Skeleton width="100px" height="15px" margin="15px 0 0 0" />
            <Skeleton width="50%" height="15px" margin="5px 0 0 0" />
            <Skeleton width="120px" height="35px" margin="20px 0 0 0" />
            <Skeleton width="250px" height="35px" />
            <Skeleton width="100%" height="35px" margin="20px 0 0 0" />
            <Skeleton width="200px" height="15px" margin="10px 0 0 0" />
            <Skeleton width="200px" height="15px" />
            <Skeleton width="200px" height="15px" margin="10px 0 0 0" />
            <Skeleton width="200px" height="15px" />
          </div>
        </div>
      </div>
    </div>
  );
};
