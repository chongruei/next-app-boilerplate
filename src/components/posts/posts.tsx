'use client'

import React, { Fragment } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { PostType } from '@/model/post'
import { getPosts } from '@/services/postServices'

import { Post } from './post'

export const Posts = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1
  })

  if (!data) return <div>Not found</div>

  return (
    <div className="divide-y" data-testid="post-container">
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage ? (
        <div>Loading more...</div>
      ) : hasNextPage ? (
        <button onClick={() => fetchNextPage()}>Load More</button>
      ) : null}
    </div>
  )
}
