import React, { useEffect, useState } from 'react'
import SingleQuadrant from '@/components/quadrant/SingleQuadrant'
import { getTaskList } from '@/api/task'
import { ITask, TTaskGroupType, IPriorityTask } from '@/types/models'
import { parseTaskType } from '@/utils/parseTaskType'
import styles from './allQuadrant.module.scss'

type TTaskGroup = {
  [key in TTaskGroupType]: ITask[]
}

const priorityTasks: IPriorityTask[] = [
  {
    icon: '1',
    priority: 1,
    title: '重要且紧急',
    color: '#ff0000',
    titleColor: '#ff0000',
    taskObj: {} as TTaskGroup
  },
  {
    icon: '2',
    priority: 2,
    title: '重要不紧急',
    color: 'rgb(255, 176, 0)',
    titleColor: 'rgb(255, 176, 0)',
    taskObj: {} as TTaskGroup
  },
  {
    icon: '3',
    priority: 3,
    title: '不重要但紧急',
    color: 'rgb(71, 114, 250)',
    titleColor: 'rgb(71, 114, 250)',
    taskObj: {} as TTaskGroup
  },
  {
    icon: '4',
    priority: 4,
    title: '不重要不紧急',
    color: 'gray',
    titleColor: 'rgb(16, 206, 156)',
    taskObj: {} as TTaskGroup
  }
]

// 任务分组
const groupTasks = (rows: ITask[]): IPriorityTask[] => {
  const taskGroups: IPriorityTask[] = JSON.parse(JSON.stringify(priorityTasks))
  rows.forEach((task: ITask) => {
    const taskGroup = taskGroups.find(
      (o: IPriorityTask) => o.priority === task.priority
    ) as IPriorityTask
    // 根据任务时间和状态
    const type: TTaskGroupType = parseTaskType(task.startTime, task.status)
    if (!taskGroup.taskObj[type]) {
      // 修复类型错误，明确 taskGroup 的类型为 { [key in TTaskGroupType]: ITask[] }
      taskGroup.taskObj[type] = [task]
    } else {
      taskGroup.taskObj[type].push(task)
    }
  })
  return taskGroups
}

const AllQuadrant: React.FC = () => {
  const [taskGroups, setTaskGroups] = useState<IPriorityTask[]>([])

  useEffect(() => {
    getTaskList().then(({ data }) => {
      const { count, rows } = data
      // 根据任务时间和状态分组
      if (!count) return
      const groupedTasks = groupTasks(rows)
      console.log('任务分组结果：', groupedTasks)

      setTaskGroups(groupedTasks)
    })
  }, [])

  const handleChange = (task: ITask) => {
    // 处理任务变化
    console.log('任务变化：', task)
  }

  return (
    <div className={styles.allQuadrant}>
      <h3 className={styles.title}>四象限</h3>
      <div className={styles.quadrantContainer}>
        {taskGroups.map(o => (
          <div
            key={o.priority}
            style={{ '--checkbox-color': o.color } as React.CSSProperties}
            className={styles.quadrantBox}
          >
            <SingleQuadrant
              icon={o.icon}
              title={o.title}
              color={o.color}
              titleColor={o.titleColor}
              taskObj={o.taskObj}
              priority={o.priority}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllQuadrant
