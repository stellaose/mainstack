/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from "react";
import styles from "../landing.module.scss";
import "animate.css";
import ReactDatePicker from "react-datepicker";
import SelectCheckbox from "./Checkbox";
import { Qualified } from "./Database";
import { useGetTransact } from "../hooks/useTransaction";

const options = [
  "Store Transaction",
  "Get Tipped",
  "Withdrawal",
  "Chargebacks",
  "Cashbacks",
  "Refer & Earn",
];

const option = ["Successful", "Pending", "Failed"];

const Table = () => {
  const [show, setShow] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [areFiltersActive, setAreFiltersActive] = useState(false);
  const [filtered, setFiltered] = useState<any[]>([]);

  const { transact } = useGetTransact();

  const toggle = () => {
    setCalendarOpen(!calendarOpen);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAreFiltersActive(true);
    setShow(false);
  };

  const filteredTransactions = transact.filter((transaction: any) => {
    const transactionDate = new Date(transaction.date);
    const isDateInRange =
      startDate &&
      endDate &&
      transactionDate >= startDate &&
      transactionDate <= endDate;
    const isTypeIncluded =
      personName.length === 0 || personName.includes(transaction?.type);
    const isStatusIncluded =
      status.length === 0 || status.includes(transaction?.status);
    return isDateInRange || isTypeIncluded || isStatusIncluded;
  });

  const transactionsToRender = areFiltersActive
    ? filteredTransactions
    : transact;

  const imageStyle = {
    transform: isCalendarOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "linear, 0.4s",
  };

  const imgStyle = {
    transform: calendarOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "linear, 0.4s",
  };

  const filterToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setStartDate(today);
    setEndDate(new Date());
  };

  const filterSevenDays = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);
    setStartDate(start);
    setEndDate(end);
  };

  const filterLastYear = () => {
    const end = new Date();
    const start = new Date();
    start.setFullYear(end.getFullYear());
    start.setMonth(0); // January is 0
    start.setDate(1); // First day of the month
    setStartDate(start);
    setEndDate(end);
  };

  const filterLastThreeMonths = () => {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 3);
    setStartDate(start);
    setEndDate(end);
  };

  const filterThisMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(start);
    setEndDate(new Date());
  };
  
  const filterAllTime = () => {
    const start = new Date();
    
    const allTimeStart = new Date(start.getFullYear() - 1);
    setStartDate(allTimeStart);
    setEndDate(new Date());
  };
  

  // Calculate the difference in days
  const diffInTime =
    startDate && endDate && Math.abs(startDate.getTime() - endDate.getTime());
  const diffInDays = diffInTime && Math.ceil(diffInTime / (1000 * 3600 * 24));

  useEffect(() => {
    const filteredTransactions = transact.filter((transaction: any) => {
      const transactionDate = new Date(transaction.date);
      const isDateInRange =
        startDate &&
        endDate &&
        transactionDate >= startDate &&
        transactionDate <= endDate;
      const isTypeIncluded =
        personName.length === 0 || personName.includes(transaction?.type);
      const isStatusIncluded =
        status.length === 0 || status.includes(transaction?.status);
      return isDateInRange || isTypeIncluded || isStatusIncluded;
    });

    setFiltered(filteredTransactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.table_body}>
        <div className={styles.table_head_body}>
          <div className={styles.table_title}>
            <h3>{transactionsToRender.length} Transactions</h3>
            <p>
              Your transaction for{" "}
              {diffInDays === 0 ? "all time" : `the last ${diffInDays} days`}{" "}
            </p>
          </div>

          <div className={styles.table_button}>
            <button onClick={openModal}>
              <div className={styles.btn_frame}>
                <div className={styles.btn_wrapper}>
                  Filter{" "}
                  {filteredTransactions.length !== transact.length &&
                  filteredTransactions.length !== 0
                    ? filteredTransactions.length
                    : null}
                </div>
                <img
                  className={styles.expand_more}
                  src="/assets/icons/expand-more-1.svg"
                />
              </div>
            </button>
            <button>
              <div className={styles.btn_frame}>
                <div className={styles.btn_wrapper}>Export list</div>
                <img
                  className={styles.expand_more}
                  src="/assets/icons/download.png"
                />
              </div>
            </button>
          </div>
        </div>

        <div className={styles.table_container}>
          {transactionsToRender.length > 0 ? (
            <>
              {transactionsToRender.map((data: any, index) => {
                const parsedDate = new Date(data?.date);
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(parsedDate);
                return (
                  <>
                    <div className={styles.transaction_list} key={index}>
                      <div
                        className={styles.group}
                        style={{
                          backgroundColor:
                            data?.type === "withdrawal" ? "#f9e3e0" : "#e3fcf2",
                        }}
                      >
                        <img
                          className={styles.img}
                          src={
                            data?.type === "withdrawal"
                              ? "/assets/icons/call-made.svg"
                              : "/assets/icons/call-received-5.svg"
                          }
                        />
                      </div>
                      <div className={styles.div}>
                        <div className={styles.psychology}>
                          {data?.metadata?.type === "coffee"
                            ? `Buy me a ${data?.metadata?.type}`
                            : data?.type === "withdrawal"
                            ? "Cash Withdrawal"
                            : data?.metadata?.product_name}
                        </div>
                        <div className={styles.div_2}>
                          <div
                            className={`${styles.text} ${styles.dan}`}
                            style={{
                              color:
                                data?.type === "withdrawal" &&
                                data?.status === "successful"
                                  ? "#0ea163"
                                  : data?.type === "withdrawal" &&
                                    data?.status === "pending"
                                  ? "#a77a07"
                                  : "#131316",
                              textTransform:
                                data?.type === "withdrawal"
                                  ? "capitalize"
                                  : "unset",
                            }}
                          >
                            {data?.type === "withdrawal"
                              ? data?.status
                              : data?.metadata?.name}
                          </div>
                        </div>
                      </div>
                      <div className={styles.div_3}>
                        <div className={styles.table_wrapper}>
                          USD {data?.amount}
                        </div>
                        <div className={styles.table_wrapper_2}>
                          {formattedDate}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div className={styles.empty_frame}>
                <div className={styles.frame}>
                  <div className={styles.group}>
                    <img src="/assets/icons/icon.png" alt=""/>
                  </div>
                  <div className={styles.text}>
                    <p className={styles.first_text}>
                      No matching transaction found for the selected filter
                    </p>
                    <p className={styles.few_steps}>
                      Change your filters to see more results, or add a new
                      product.
                    </p>
                  </div>
                </div>
                <div className={styles.medium_primary}>
                  <button className={styles.label_icon}>
                    Clear filter
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {show && (
        <div className={styles.modal_overlay} onClick={closeModal}>
          <div
            ref={modalRef}
            className={`${styles.animate_body} ${
              show
                ? "animate__animated animate__slideInRight"
                : "animate__animated animate__slideOutRight"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.modal_top}>
                <div className={styles.title_icon}>
                  <div className={styles.title}>Filter</div>
                  <div className={styles.element_icon}>
                    <img
                      className={styles.close}
                      src="/assets/icons/close.png"
                      onClick={() => setShow(false)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.div}>
                  <button
                    className={`${styles.wrapper} ${styles.tag}`}
                    type="button"
                    onClick={filterToday}
                  >
                    Today
                  </button>
                  <button
                    className={`${styles.wrapper} ${styles.tag}`}
                    type="button"
                    onClick={filterSevenDays}
                  >
                    7 days
                  </button>
                  <button
                    className={`${styles.wrapper} ${styles.tag}`}
                    type="button"
                    onClick={filterThisMonth}
                  >
                    This month
                  </button>
                  <button
                    className={`${styles.wrapper} ${styles.tag}`}
                    type="button"
                    onClick={filterLastThreeMonths}
                  >
                    Last 3 months
                  </button>
                  <button
                    className={`${styles.wrapper} ${styles.tag}`}
                    type="button"
                    onClick={filterLastYear}
                  >
                    This year
                  </button>

                  <button
                    className={`${styles.wrapper} ${styles.div_wrapper}`}
                    type="button"
                    onClick={filterAllTime}
                  >
                    All time
                  </button>
                </div>
              </div>

              <div className={styles.input_content}>
                <div>
                  <p>Date Range</p>

                  <div className={styles.input_flex}>
                    <div className={styles.flex_one} onClick={toggleCalendar}>
                      <div onClick={(event) => event.stopPropagation()}>
                        <ReactDatePicker
                          selected={startDate}
                          onChange={(date: Date) => {
                            setStartDate(date);
                          }}
                          open={isCalendarOpen}
                          onClickOutside={() => setIsCalendarOpen(false)}
                          dateFormat="dd MMM yyyy"
                        />
                      </div>

                      <img
                        src="/assets/icons/expand-more-1.svg"
                        alt=""
                        style={imageStyle}
                      />
                    </div>
                    <div className={styles.flex_one} onClick={toggle}>
                      <div onClick={(event) => event.stopPropagation()}>
                        <ReactDatePicker
                          selected={endDate}
                          onChange={(date: Date) => setEndDate(date)}
                          open={calendarOpen}
                          dateFormat="dd MMM yyyy"
                        />
                      </div>

                      <img
                        src="/assets/icons/expand-more-1.svg"
                        alt=""
                        style={imgStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.block_input}>
                  <p>Transaction Type</p>
                  <div className={styles.input_block}>
                    <SelectCheckbox
                      name={personName}
                      setName={setPersonName}
                      options={options}
                    />
                  </div>
                </div>

                <div className={styles.block_input}>
                  <p>Transaction Status</p>
                  <div className={styles.input_block}>
                    <SelectCheckbox
                      name={status}
                      setName={setStatus}
                      options={option}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modal_bottom}>
                <div className={styles.medium_primary}>
                  <button
                    className={`${styles.label} ${styles.label_icon}`}
                    onClick={() => setShow(false)}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.medium_primary}>
                  <button
                    className={`${styles.label} ${styles.label_icon_2}`}
                    type="submit"
                    disabled={personName.length === 0 || status.length === 0}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
