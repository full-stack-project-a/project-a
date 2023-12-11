import React from "react";
import styles from '../../styles/main/loading.module.css';

const LoadingScreen = () => {
   return (
      <div className={styles.loadingScreen}>
         <div className={styles.loadingIndicator}></div>
      </div>
   );
};

export default LoadingScreen;
