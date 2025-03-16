// 主菜单组件（可配置）
import SvgIcon from '@/components/SvgIcon.tsx'
import styles from './mainNav.module.scss'

const MainNav: React.FC = () => {
  const navList = [
    { id: 1, title: '任务', icon: 'task' },
    { id: 2, title: '日历', icon: 'rili' },
    { id: 3, title: '四象限', icon: 'xiangxian' }
    // { id: 4, title: '搜索', icon: '' }
  ]

  return (
    <div className={styles.mainNav}>
      <div className={styles.avator}>
        <img src="/src/assets/logo.png" />
      </div>
      {navList.map(nav => (
        <SvgIcon className={styles.customChild} key={nav.id} name={nav.icon} fillColor="rgb(155, 156, 163)" />
      ))}
    </div>
  )
}

export default MainNav
