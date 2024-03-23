import { queryInstance } from './queryInstance'

export const getPostById = async (id: number) =>
  queryInstance.get(`/posts/${id}`).then(res => res.data)

export const getPosts = async ({ pageParam = 1 }: { pageParam: number }) =>
  queryInstance.get(`/posts`, { params: { _page: pageParam } }).then(res => res.data)
