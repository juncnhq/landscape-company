import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  // Đã đăng nhập mà vào lại đây thì đưa thẳng vào trang quản trị, khỏi phải
  // đăng nhập lần nữa.
  if (await verifySession()) redirect('/admin/projects')

  return <LoginForm />
}
