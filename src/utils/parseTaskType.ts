// 任务时间和状态解析为枚举值
// 时间：今天 | 明天 | 最近7天 | 更远 | 无日期 | 已过期
// 状态：已完成 | 已放弃
export const parseTaskType = (time: string, status: number) => {
  if (status === 3) return 'completed'
  if (status === 4) return 'abandoned'
  if (!time) return 'noDate'
  // 统一转换为日期对象
  const date = new Date(Number(time))
  // 有效性校验
  if (isNaN(date.getTime())) return 'noDate'
  // 获取本地化日期边界
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )

  // 计算天数差
  const timeDiff = targetDay.getTime() - today.getTime()
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

  // 分类逻辑
  if (dayDiff < 0) return 'expired'
  if (dayDiff === 0) return 'today'
  if (dayDiff === 1) return 'tomorrow'
  if (dayDiff >= 2 && dayDiff <= 7) return 'recent7Days'
  return 'far'
}

export enum TaskType {
  today = '今天',
  tomorrow = '明天',
  recent7Days = '最近7天',
  far = '更远',
  noDate = '无日期',
  expired = '已过期',
  completed = '已完成',
  abandoned = '已放弃'
}
