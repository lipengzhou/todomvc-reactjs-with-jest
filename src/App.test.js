import { render, screen } from '@testing-library/react'
import App from './App'
import { unmountComponentAtNode } from 'react-dom'

let container = null
beforeEach(() => {
  // 创建一个 DOM 作为渲染目标
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // console.log('afterEach')
  // 退出时进行清理
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test('renders learn react link', () => {
  expect(1).toBe(1)
  // render(<App />)
  // const linkElement = screen.getByText(/eat/i)
  // expect(linkElement).toBeInTheDocument()
})
