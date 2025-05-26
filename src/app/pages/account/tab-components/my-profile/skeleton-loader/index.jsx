import { Skeleton } from "@components/image/placeholder/skeleton";

import styles from "./skeleton.module.css";

export const ProfileSkeleton = () => {
  return (
    <div>
      <Skeleton width="100px" height="15px" />
      <Skeleton
        width="500px"
        height="25px"
        margin="10px 0 0 0"
        className={styles.longLine}
      />

      <Skeleton width="100px" height="15px" margin="25px 0 0 0" />
      <Skeleton
        width="500px"
        height="25px"
        margin="10px 0 0 0"
        className={styles.longLine}
      />

      <Skeleton width="100px" height="15px" margin="25px 0 0 0" />
      <Skeleton
        width="500px"
        height="25px"
        margin="10px 0 0 0"
        className={styles.longLine}
      />

      <Skeleton
        width="120px"
        height="35px"
        margin="35px 0 0 0"
        borderRadius="6px"
      />
    </div>
  );
};
