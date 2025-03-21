import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../mainNav/MainNav'
import SliderLayout from '../sliderLayout/SliderLayout'
import styles from './layout.module.scss'

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <MainNav />
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
