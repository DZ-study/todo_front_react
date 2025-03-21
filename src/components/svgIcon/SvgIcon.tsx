import { ReactSVG } from 'react-svg'
import styles from './svgIcon.module.scss'
// 批量导入 SVG 图标
// 在 TypeScript 中，默认的 `ImportMeta` 类型没有 `globEager` 属性，需要使用 `vite` 或其他支持此功能的构建工具
// 如果你使用的是 Vite，可以通过类型断言来解决这个问题
const svgIcons = (import.meta as any).glob('/src/assets/svg/*.svg', {
  eager: true
})

type TProps = {
  name: string
  width?: number
  height?: number
  fillColor?: string
  [key: string]: any
}

const SvgIcon = ({
  name,
  width = 24,
  height = 24,
  fillColor = '#666666',
  ...props
}: TProps) => {
  // 鼠标hover时改变图标颜色
  const svg = svgIcons[`/src/assets/svg/${name}.svg`]?.default

  if (!svg) {
    console.log(`SVG "${name}" not found.`)
    return null
  }

  return (
    <ReactSVG
      src={svg}
      {...props}
      beforeInjection={svg => {
        svg.setAttribute('width', `${width}px`)
        svg.setAttribute('height', `${height}px`)
        svg.setAttribute('fill', fillColor)
      }}
      className={`${styles.svgIcon} ${props.className}`}
    />
  )
}

export default SvgIcon
