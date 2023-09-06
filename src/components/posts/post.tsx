'use client'

import React from 'react'

import { PostType } from '@/model/post'

interface Props {
  post: PostType
}

export const Post = ({ post }: Props) => {
  return (
    <div className="py-4" data-testid="post">
      <p className="text-2xl font-semibold">{post.title}</p>
      <p className="mt-2 text-gray-200">{post.body}</p>
    </div>
  )
}
