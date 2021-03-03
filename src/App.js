import { useMemo, useState } from 'react'
import TodoHeader from './Header'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'eat', done: false },
    { id: 2, text: 'sleep', done: false },
    { id: 3, text: 'play', done: true }
  ])

  const handleNewTodo = (value) => {
    const lastTodo = todos[todos.length - 1]
    const id = lastTodo ? lastTodo.id + 1 : 1
    setTodos([
      ...todos,
      { id, text: value, done: false }
    ])
  }

  const doneTodo = (id, value) => {
    const todo = todos.find(t => t.id === id)
    todo.done = value
    setTodos([
      ...todos
    ])
  }

  const removeTodo = (id) => {
    const index = todos.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
      setTodos([...todos])
    }
  }

  const toggleAllState = useMemo(() => {
    return todos.every(t => t.done)
  }, [todos])

  const toggleAll = (checked) => {
    todos.forEach(t => t.done = checked)
    setTodos([...todos])
  }

  const saveTodo = (id, text) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      todo.text = text
      setTodos([...todos])
    }
  }

  const removeAllDone = () => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].done) {
        todos.splice(i, 1)
        i--
      }
    }
    setTodos([...todos])
  }

  const getFilterText = () => {
    const hash = window.location.hash.substring(1)
    let text = ''
    switch (hash) {
      case '/active':
        text = 'active'
        break
      case '/completed':
        text = 'completed'
        break
      default:
        text = 'all'
        break
    }
    return text
  }

  const [filterText, setFilterText] = useState(getFilterText())

  const filterTodos = useMemo(() => {
    if (filterText === 'all') {
      return todos
    } else if (filterText === 'active') {
      return todos.filter(t => !t.done)
    } else if (filterText === 'completed') {
      return todos.filter(t => t.done)
    }
  }, [todos, filterText])

  window.onhashchange = () => {
    setFilterText(getFilterText())
  }

  return (
    <section className="todoapp">
      <TodoHeader handleNewTodo={handleNewTodo} />
      {/* This section should be hidden by default and shown when there are todos */}
      <section className="main">
        <span>{toggleAllState}</span>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={toggleAllState}
          onChange={e => toggleAll(e.target.checked)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filterTodos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              doneTodo={doneTodo}
              removeTodo={removeTodo}
              saveTodo={saveTodo}
            />
          ))}
        </ul>
      </section>
      {/* This footer should be hidden by default and shown when there are todos */}
      <TodoFooter
        todos={todos}
        removeAllDone={removeAllDone}
        filterText={filterText}
      />
    </section>
  )
}

export default App
