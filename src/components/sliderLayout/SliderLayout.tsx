import React, { useState, useRef, useEffect } from 'react'
import styles from './sliderLayout.module.scss'
import { Layout } from 'antd'

type TColumn = {
  id: number
  minWidth: number
  maxWidth?: number
  content: React.ReactNode
}

interface SliderLayoutProps {
  columns: TColumn[]
}

const SliderLayout: React.FC<SliderLayoutProps> = ({ columns = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widthArr, setWidthArr] = useState<number[]>(() =>
    columns.map(item => item.minWidth)
  )
  const isDragging = useRef(false)
  const moveIndex = useRef(0)
  const startX = useRef(0)
  const startWidth = useRef(0)

  // 使用ref保存最新宽度值
  const widthsRef = useRef(widthArr)
  useEffect(() => {
    widthsRef.current = widthArr
  }, [widthArr])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault()
    isDragging.current = true
    moveIndex.current = index
    startX.current = event.clientX
    startWidth.current = widthsRef.current[index]

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return

    const currColumn = columns[moveIndex.current]
    const deltaX = e.clientX - startX.current
    let newWidth = startWidth.current + deltaX

    // 应用宽度限制
    newWidth = Math.max(
      currColumn.minWidth,
      Math.min(currColumn.maxWidth || 0, newWidth)
    )

    setWidthArr(prev =>
      prev.map((w, i) => (i === moveIndex.current ? newWidth : w))
    )
  }

  const handleMouseUp = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <Layout ref={containerRef} className={styles.container}>
      {columns.map((item, index) => {
        const isLast = index === columns.length - 1
        return (
          <React.Fragment key={item.id}>
            <div
              style={
                isLast
                  ? {
                      flex: 1
                    }
                  : {
                      width: `${widthArr[index]}px`,
                      minWidth: `${item.minWidth}px`,
                      maxWidth: `${item.maxWidth}px`
                    }
              }
              className={styles.sider}
            >
              {item.content}
            </div>
            {!isLast && (
              <div
                className={styles.resizerContainer}
                onMouseDown={e => handleMouseDown(e, index)}
              >
                <div className={styles.resizer} />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </Layout>
  )
}

export default SliderLayout
