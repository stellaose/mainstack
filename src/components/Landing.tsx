import React from 'react'
import styles from '../landing.module.scss'
import Hero from './Hero'
import Table from './Table'

const Landing = () => {
  return (
    <>
      <div className={styles.landing_body}>
        <Hero />   
        <Table/>
      </div>
    </>
  )
}

export default Landing