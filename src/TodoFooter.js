import classNames from 'classnames'
import { useMemo } from 'react'

export default function TodoFooter ({ todos, removeAllDone, filterText }) {
  const remainingCount = useMemo(() => {
    return todos.filter(t => !t.done).length
  }, [todos])

  return (
    <footer className="footer">
      {/* This should be `0 items left` by default */}
      <span className="todo-count">
        <strong>{remainingCount}</strong> item left
      </span>
      {/* Remove this if you don't implement routing */}
      <ul className="filters">
        <li>
          <a className={classNames({
            selected: filterText === 'all'
          })} href="#/">
            All
          </a>
        </li>
        <li>
          <a className={classNames({
            selected: filterText === 'active'
          })} href="#/active">Active</a>
        </li>
        <li>
          <a className={classNames({
            selected: filterText === 'completed'
          })} href="#/completed">Completed</a>
        </li>
      </ul>
      {/* Hidden if no completed items are left ↓ */}
      <button
        className="clear-completed"
        onClick={removeAllDone}
      >Clear completed</button>
    </footer>
  )
}
