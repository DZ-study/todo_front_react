// 单个象限组件
import React, { useEffect, useState } from 'react'
import type { CollapseProps, CheckboxProps } from 'antd'
import { Collapse, Checkbox, Flex } from 'antd'
import styles from './singleQuadrant.module.scss'
import { ITask, TTaskGroupType } from '@/types/models'
import SvgIcon from '@/components/svgIcon/SvgIcon'
import { IPriorityTask } from '@/types/models'

const taskGroupLabelMap: { [key in TTaskGroupType]: string } = {
  today: '今天',
  tomorrow: '明天',
  recent7Days: '最近7天',
  far: '更远',
  noDate: '无日期',
  expired: '已过期',
  completed: '已完成',
  abandoned: '已放弃'
}

const SingleQuadrant: React.FC<IPriorityTask> = props => {
  const { title, icon, color, titleColor, taskObj } = props
  const [collapseItem, setCollapseItem] = useState<CollapseProps['items']>([])
  const activeKeys = Object.keys(taskObj)

  const handleChange = (task: ITask) => {
    const onChange = props.onChange
    if (!onChange) return
    onChange(task)
  }

  useEffect(() => {
    const items: CollapseProps['items'] = []
    activeKeys.forEach((key: string) => {
      items.push({
        key,
        // 通过类型断言确保可以使用 string 类型的 key 来索引 taskGroupLabelMap
        label: taskGroupLabelMap[key as TTaskGroupType],
        children: taskObj[key as TTaskGroupType].map(task => (
          <Flex key={task.id}>
            <Checkbox onChange={() => handleChange(task)}>
              {task.title}
            </Checkbox>
          </Flex>
        ))
      })
    })
    setCollapseItem(items)
  }, [taskObj])

  return (
    <div className={styles.quadrant}>
      <div className={styles.title}>
        <SvgIcon name={icon} width={18} />
        <span style={{ color: titleColor }}>{title}</span>
      </div>
      <Collapse activeKey={activeKeys} ghost items={collapseItem} />
    </div>
  )
}

export default SingleQuadrant
