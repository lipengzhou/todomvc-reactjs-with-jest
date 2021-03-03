import { unmountComponentAtNode, render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Foo from './Foo'

/** @type {HTMLDivElement} */
let container = null
beforeEach(() => {
  // 创建一个 DOM 作为渲染目标
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  console.log('afterEach')
  // 退出时进行清理
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test('Foo', () => {
  act(() => {
    render(<Foo/>, container)
  })
  expect(container.textContent).toContain('hello')
})
