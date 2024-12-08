import { Env } from '../environment'
import type { Task } from '../models/task'

export const onRequestGet: PagesFunction<Env> = async ({}) => {
  const data: Task[] = [
    {
      id: '1',
      name: 'Task 1',
      date: Date.now(),
    },
    {
      id: '2',
      name: 'Task 2',
      date: Date.now(),
    },
  ]

  // simulate a lag for data access
  await new Promise((r) => setTimeout(r, 1000))

  return Response.json(data)
}
