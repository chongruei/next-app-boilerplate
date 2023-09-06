'use client'

import { FC, Fragment, useRef } from 'react'

import clsx from 'clsx'
import { useSnapshot } from 'valtio'

import { Filter, addTodo, removeTodo, setFilter, todoStore, toggleDone } from '@/store/todo'

const filterValues: Filter[] = ['all', 'pending', 'completed']

const Filters: FC = () => {
  const snap = useSnapshot(todoStore)
  return (
    <nav className="flex gap-x-2">
      {filterValues.map(filter => (
        <Fragment key={filter}>
          <input
            readOnly
            checked={snap.filter === filter}
            className="cursor-pointer"
            id={`todo-filter-${filter}`}
            type="radio"
            value={filter}
            onClick={() => setFilter(filter)}
          />
          <label className="cursor-pointer" htmlFor={`todo-filter-${filter}`}>
            {filter}
          </label>
        </Fragment>
      ))}
    </nav>
  )
}

const Todos: FC = () => {
  const snap = useSnapshot(todoStore)
  return (
    <ul className="list-decimal pl-5">
      {snap.todos
        .filter(({ status }) => status === snap.filter || snap.filter === 'all')
        .map(({ description, status, id }) => {
          return (
            <li key={id}>
              <span
                className={clsx('cursor-pointer', {
                  'line-through': status === 'completed'
                })}
                onClick={() => toggleDone(id, status)}
              >
                {description}
              </span>
              <button className="ml-4 text-white" onClick={() => removeTodo(id)}>
                x
              </button>
            </li>
          )
        })}
    </ul>
  )
}

const CreateTodo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="flex gap-x-2">
      <input
        ref={inputRef}
        className="px-2 text-gray-900"
        minLength={2}
        name="description"
        type="text"
      />
      <button className="add" onClick={() => addTodo(inputRef.current?.value ?? '')}>
        Add new
      </button>
    </section>
  )
}

const TodoList: FC = () => {
  return (
    <div className="container my-4 flex flex-col gap-y-4">
      <h2 className="text-2xl text-white">To-do List</h2>
      <Filters />
      <CreateTodo />
      <Todos />
    </div>
  )
}

export default TodoList
