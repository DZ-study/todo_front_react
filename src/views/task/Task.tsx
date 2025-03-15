import { FC, useEffect, useState } from 'react'
import { getTaskList } from '@/api/task'
import { ITask } from '@/types/models'

const Task: FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([])

  useEffect(() => {
    getTaskList().then(({ data }) => {
      setTaskList(data.rows)
    })
  }, [])

  return (
    <div>
      {taskList.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  )
}

export default Task
