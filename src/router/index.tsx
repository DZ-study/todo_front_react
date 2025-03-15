import { lazy, Suspense, ReactNode, FC, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// 懒加载页面组件
const Login = lazy(() => import('@/views/user/Login'))
const Register = lazy(() => import('@/views/user/Register'))
const Home = lazy(() => import('@/views/Home'))
const TaskList = lazy(() => import('@/views/task/Task'))

// 自定义路由类型
interface RouteConfig {
  path: string
  element: ReactNode
}

// 路由数组
const routes: RouteConfig[] = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
  { path: '/task', element: <TaskList /> }
]

// 路由组件
const App: FC = () => {
  // const nav = useNavigate()
  // useEffect(() => {
  //   console.log('11111111')
  //   useAxiosInterceptors(nav)
  // }, [nav])
  // 返回一个BrowserRouter组件，用于包裹整个路由
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  )
}

export default App
