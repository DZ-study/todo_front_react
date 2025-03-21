// 主菜单组件（可配置）
import SvgIcon from '@/components/svgIcon/SvgIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './mainNav.module.scss'
import { useEffect, useState } from 'react'

type TNav = {
  id: number
  title: string
  path: string
  icon: string
}

const MainNav: React.FC = () => {
  // TODO: 后台获取
  const navList: TNav[] = [
    { id: 1, title: '任务', path: '/task', icon: 'task' },
    { id: 2, title: '日历', path: '/calendar', icon: 'rili' },
    { id: 3, title: '四象限', path: '/quadrant', icon: 'xiangxian' }
    // { id: 4, title: '搜索', icon: '' }
  ]
  const [currKey, setCurrKey] = useState('')
  const location = useLocation()

  useEffect(() => {
    setCurrKey(location.pathname)
  }, [location.pathname])

  const navigate = useNavigate()

  const handleClick = (nav: TNav) => {
    if (!nav || !nav.path) return
    navigate(nav.path)
  }

  return (
    <div className={styles.mainNav}>
      <div className={styles.avator}>
        <img src="/src/assets/logo.png" />
      </div>
      {navList.map(nav => {
        const isCurr = nav.path === currKey
        return (
          <SvgIcon
            className={[styles.customChild, isCurr ? styles.current : ''].join(
              ' '
            )}
            key={nav.id}
            name={nav.icon}
            fillColor={isCurr ? 'var(--primary-color)' : 'rgb(155, 156, 163)'}
            onClick={() => handleClick(nav)}
          />
        )
      })}
    </div>
  )
}

export default MainNav
