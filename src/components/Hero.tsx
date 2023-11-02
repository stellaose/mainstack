/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Chart from './Chart'
import styles from "../landing.module.scss";
import { useGetWallet } from "../hooks/useTransaction";


const Hero = () => {
  const {wallet} =useGetWallet()
  return (
    <>
      <div className={styles.hero_body}>
        <div className={styles.hero_up}>
          <div className={styles.up_frame}>
            <div className={styles.div}>
              <div className={styles.text_wrapper}>Available Balance</div>
              <div className={styles.text_wrapper_2}>USD {wallet?.balance}</div>
            </div>

            <div className={styles.label_icon}>
              <div className={styles.text_wrapper_3}>Withdraw</div>
            </div>
          </div>
          
          <div className = {styles.chart_body}>
            <Chart/>
          </div>
        </div>

        <div className={styles.hero_down}>
          <div className={styles.div}>
            <div className={styles.div_2}>
              <div className={styles.text_wrapper}>Ledger Balance</div>
              <img className={styles.info} src="/assets/icons/info-1.svg" />
            </div>
            <div className={styles.text_wrapper_2}>USD {wallet?.ledger_balance}</div>
          </div>
          <div className={styles.div}>
            <div className={styles.div_2}>
              <div className={styles.text_wrapper}>Total Payout</div>
              <img className={styles.info} src="/assets/icons/info-4.svg" />
            </div>
            <div className={styles.text_wrapper_2}>USD {wallet?.total_payout}</div>
          </div>
          <div className={styles.div}>
            <div className={styles.div_2}>
              <div className={styles.text_wrapper}>Total Revenue</div>
              <img className={styles.info} src="/assets/icons/info-3.svg" />
            </div>
            <div className={styles.text_wrapper_2}>USD {wallet.total_revenue}</div>
          </div>
          <div className={styles.div}>
            <div className={styles.div_2}>
              <div className={styles.text_wrapper}>Pending Payout</div>
              <img className={styles.info} src="/assets/icons/info-2.svg" />
            </div>
            <div className={styles.text_wrapper_2}>USD {wallet?.pending_payout}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
