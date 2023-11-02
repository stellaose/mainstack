/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "../navbar.module.scss";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar_body}>
        <div className={styles.navigation}>
          <img
            className={styles.mainstack_logo}
            src="/assets/icons/mainstack-logo-4.svg"
          />
          <div className={styles.menu}>
          
            <div className={styles.menu_item}>
              <img className={styles.img} src="/assets/icons/home-8.svg" />
              <div className={styles.text_wrapper}>Home</div>
            </div>
            <div className={styles.menu_item}>
              <img
                className={styles.img}
                src="/assets/icons/insert-chart-4.svg"
              />
              <div className={styles.text_wrapper}>Analytics</div>
            </div>
            <div className={styles.div}>
              <img className={styles.img} src="/assets/icons/payments-5.svg" />
              <div className={styles.home}>Revenue</div>
            </div>
            <div className={styles.menu_item}>
              <img className={styles.img} src="/assets/icons/group-4.svg" />
              <div className={styles.text_wrapper}>CRM</div>
            </div>
            <div className={styles.menu_item}>
              <img className={styles.img} src="/assets/icons/widgets-6.svg" />
              <div className={styles.text_wrapper}>Apps</div>
            </div>
          </div>
         
          <div className={styles.frame}>
            <div className={styles.small_tertiary}>
              <div className={styles.icon}>
                <img
                  className={styles.img_2}
                  src="/assets/icons/notifications-4.svg"
                />
              </div>
            </div>
            <div className={styles.small_tertiary_wrapper}>
              <div className={styles.small_tertiary}>
                <div className={styles.icon}>
                  <img
                    className={styles.img_2}
                    src="/assets/icons/chat-4.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.frame2}>
              <div className={styles.avi}>
                <div className={styles.overlap_group}>
                  <div className={styles.avatar}>
                    <img
                      className={styles.profile}
                      src="/assets/icons/profile-1.png"
                    />
                  </div>
                  <img
                    className={styles.avatars}
                    src="/assets/icons/avatars-2.svg"
                  />
                  <div className={styles.ellipse}></div>
                  <div className={styles.text_wrapper_2}>OJ</div>
                </div>
              </div>
              <img className={styles.menu_2} src="/assets/icons/menu-4.svg" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.app_bar}>
        <div className={styles.frame}>
          <div className={styles.app_bar_list}>
            <img className={styles.product_icons} src="/assets/icons/product-icons-45.svg" />
          </div>
          <div className={styles.app_bar_list}>
            <img
              className={styles.product_icons}
              src="/assets/icons/product-icons-46.svg"
            />
          </div>
          <div className={styles.app_bar_list}>
            <img
              className={styles.product_icons}
              src="/assets/icons/product-icons-47.svg"
            />
          </div>
          <div className={styles.app_bar_list}>
            <img className={styles.product_icons} src="/assets/icons/product-icons-48.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
