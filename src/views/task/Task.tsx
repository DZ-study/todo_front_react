import { FC, useEffect, useState } from 'react'
import { getTaskList } from '@/api/task'
import SliderLayout from '@/components/sliderLayout/SliderLayout'
import { ITask } from '@/types/models'
import styles from './task.module.scss'

const Task: FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([])

  useEffect(() => {
    getTaskList().then(({ data }) => {
      setTaskList(data.rows)
    })
  }, [])

  return (
    <div className={styles.container}>
      <SliderLayout
        columns={[
          {
            id: 1,
            minWidth: 150,
            maxWidth: 350,
            content: <div>task list</div>
          },
          {
            id: 2,
            minWidth: 250,
            maxWidth: 650,
            content: (
              <div>
                {taskList.map(task => (
                  <div key={task.id}>{task.title}</div>
                ))}
              </div>
            )
          },
          {
            id: 3,
            minWidth: 250,
            content: (
              <div>
                {taskList.map(task => (
                  <div key={task.id}>{task.title}</div>
                ))}
              </div>
            )
          }
        ]}
      ></SliderLayout>
    </div>
  )
}

export default Task
