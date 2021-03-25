import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

describe('添加任务', () => {
  test('输入内容敲回车添加到列表中，并且输入框被清空', async () => {
    render(
      <Router>
        <App />
      </Router>
    )
    const input = screen.getByTestId('new-todo')
    userEvent.type(input, 'Hello World{enter}')
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(input.value).toBe('')
  })
})

describe('删除任务', () => {
  test('点击删除按钮，任务项应该被移除', () => {
    const todos = [ { id: 1, text: 'eat', done: false } ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    // 找到删除按钮
    userEvent.click(screen.getByTestId('destroy'))

    expect(screen.queryByText('eat')).toBeNull()
  })
})

describe('切换单个任务完成状态', () => {
  test('切换任务完成状态按钮，任务的完成样式也跟随改变', async () => {
    const todos = [ { id: 1, text: 'eat', done: false } ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const done = screen.getByTestId('todo-done')

    userEvent.click(done)

    expect(screen.getByTestId('todo-item').classList.contains('completed')).toBeTruthy()

    userEvent.click(done)

    expect(screen.getByTestId('todo-item').classList.contains('completed')).toBeFalsy()
  })
})

describe('切换所有任务的完成状态', () => {
  test('点击切换所有按钮，所有的任务应该随之改变', async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true },
      { id: 3, text: 'play', done: false }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const toggleAll = screen.getByTestId('toggle-all')

    userEvent.click(toggleAll)

    const todoDones = screen.getAllByTestId('todo-done')

    todoDones.forEach((item) => {
      expect(item.checked).toBeTruthy()
    })

    userEvent.click(toggleAll)

    todoDones.forEach((item) => {
      expect(item.checked).toBeFalsy()
    })
  })

  test('当所有任务已完成的时候，全选按钮应该被选中，否则不选中', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: true },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const toggleAll = screen.getByTestId('toggle-all')

    expect(toggleAll.checked).toBeTruthy()

    userEvent.click(screen.getAllByTestId('todo-done')[0])

    expect(toggleAll.checked).toBeFalsy()

    userEvent.click(screen.getAllByTestId('todo-done')[0])
    expect(toggleAll.checked).toBeTruthy()
  })
})

describe('编辑任务', () => {
  test('双击任务项文本，应该获得编辑状态', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    expect(todoItem.classList.contains('editing')).toBeFalsy()
    userEvent.dblClick(todoText)
    expect(todoItem.classList.contains('editing')).toBeTruthy()
  })

  test('修改任务项文本敲回车之后，应该保存修改以及取消编辑状态', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')

    userEvent.dblClick(todoText)

    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, 'hello{enter}')

    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(todoItem.classList.contains('editing')).toBeFalsy()
  })

  test('清空任务项文本，保存编辑应该删除任务项', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    // const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')

    userEvent.dblClick(todoText)
    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, '{enter}')

    expect(screen.queryByText('eat')).toBeNull()
  })

  test('修改任务项文本按下 ESC 后，应该取消编辑状态以及任务项文本保持不变', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')

    userEvent.dblClick(todoText)
    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, 'hello{esc}')

    expect(screen.getByText('eat')).toBeInTheDocument()
    expect(todoItem.classList.contains('editing')).toBeFalsy()
  })
})

describe('删除所有已完成任务', () => {
  test('如果所有任务已完成，清除按钮应该不展示，否则展示', async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: false }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    expect(screen.queryByTestId('clear-completed')).toBeNull()

    userEvent.click(screen.getAllByTestId('todo-done')[0])

    expect(screen.queryByTestId('clear-completed')).not.toBeNull()
  })

  test('点击清除按钮，应该删除所有已完成任务', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const clearCompleted = screen.queryByTestId('clear-completed')
    userEvent.click(clearCompleted)
    expect(screen.queryAllByTestId('todo-item')).toHaveLength(1)
    expect(screen.getByText('sleep')).toBeInTheDocument()
  })
})

describe('展示剩余任务的数量', () => {
  test('展示所有剩余未完成任务数量', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

describe('数据筛选', () => {
  const todos = [
    { id: 1, text: 'play', done: true },
    { id: 2, text: 'eat', done: false },
    { id: 3, text: 'sleep', done: true }
  ]

  const filterTodos = {
    all: () => todos,
    active: () => todos.filter((t) => !t.done),
    completed: () => todos.filter((t) => t.done)
  }

  test('点击 all 链接，应该展示所有任务，并且 all 链接应该高亮', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-all')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3)
    expect(link.classList.contains('selected')).toBeTruthy()
  })

  test('点击 active 链接，应该展示所有任务，并且 active 链接应该高亮', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-active')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(1)
    expect(link.classList.contains('selected')).toBeTruthy()
  })

  test('点击 completed 链接，应该展示所有任务，并且 completed 链接应该高亮', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-completed')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(2)
    expect(link.classList.contains('selected')).toBeTruthy()
  })
})
