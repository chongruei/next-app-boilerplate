import { proxy } from 'valtio'

export type Status = 'pending' | 'completed'
export type Filter = Status | 'all'
export type Todo = {
  description: string
  status: Status
  id: number
}

/**
 * @description Action functions defined in module
 * @see https://valtio.pmnd.rs/docs/how-tos/how-to-organize-actions
 */
export const todoStore = proxy<{ filter: Filter; todos: Todo[] }>({
  filter: 'all',
  todos: []
})

export const addTodo = (description: string) => {
  todoStore.todos.push({
    description,
    status: 'pending',
    id: Date.now()
  })
}

export const removeTodo = (id: number) => {
  const index = todoStore.todos.findIndex(todo => todo.id === id)
  if (index >= 0) {
    todoStore.todos.splice(index, 1)
  }
}

export const toggleDone = (id: number, currentStatus: Status) => {
  const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending'
  const todo = todoStore.todos.find(todo => todo.id === id)
  if (todo) {
    todo.status = nextStatus
  }
}

export const setFilter = (filter: Filter) => {
  todoStore.filter = filter
}
