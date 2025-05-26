import { Skeleton } from "@components/image/placeholder/skeleton";
import styles from "./skeleton.module.css";

export const CollectionSkeleton = () => {
  return (
    <div className="wrapper">
      <div className={`container`}>
        <Skeleton width="200px" height="20px" margin="50px 0 10px 0" />
        <div className={`${styles.cardContainer}`}>
          {[1, 2, 3, 4, 5].map(() => {
            return (
              <div className={`${styles.card}`}>
                <Skeleton
                  borderRadius="7px"
                  margin="10px 0 0 0"
                  className={styles.cardSkeleton}
                />
                <Skeleton width="100%" height="12px" margin="10px 0 7px 0" />
                <Skeleton width="100%" height="12px" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
