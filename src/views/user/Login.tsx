import { FC } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '@/api/user'
import logo from '@/assets/logo.png'
import styles from './login.module.scss'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Login: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm<FieldType>()

  const handleLogin = () => {
    const { username, password } = form.getFieldsValue()
    if (username && password) {
      // 登录
      login({ username, password })
        .then(({ data = {} }) => {
          // 存储token
          localStorage.setItem('token', data.token)
          nav('/task')
        })
        .catch(err => {
          console.log(err)
          message.error(err.message || '登录失败')
        })
    }
  }

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
  }

  const jumpTo = (path: string) => {
    nav(path)
  }

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => jumpTo('/register')}>
            没有账号？注册
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className={styles.loginBtn} onClick={handleLogin}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
