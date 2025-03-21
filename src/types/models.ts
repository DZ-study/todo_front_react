// 公用类型
export interface ITask {
  id: number
  title: string
  priority: number
  status: number
  startTime: string
  tags: string[]
}

export type TTaskGroupType =
  | 'today'
  | 'tomorrow'
  | 'recent7Days'
  | 'far'
  | 'noDate'
  | 'expired'
  | 'completed'
  | 'abandoned'

export interface IPriorityTask {
  icon: string
  priority: 1 | 2 | 3 | 4
  title: string
  titleColor: string // 标题颜色
  color: string // 复选框颜色
  taskObj: { [key in TTaskGroupType]: ITask[] }
}
