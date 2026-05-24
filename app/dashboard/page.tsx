"use client"
import DashComponent from '@/components/DashComponent'
import Editor from '@/components/Editor'
import Themer from '@/components/Themer'
import TopCommentCard from '@/components/TopCommentCard'
import TopPostCard from '@/components/TopPostCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TopPostCardT } from '@/types/types'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Dashboard() {
  // all posts
  const {data: allPosts, isLoading: allPostsLoading, error: allPostsError} = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axios.get("/api/posts/all")
      return res.data
    }
  })

  // recent posts
  const {data: recentPosts, isLoading: recentPostsLoading, error: recentPostsError} = useQuery({
    queryKey: ["recentPosts"],
    queryFn: async () => {
      const res = await axios.get("/api/posts/recent")
      return res.data
    }
  })

  // all comments
  const {data: allComments, isLoading: allCommentsLoading, error: allCommentsErrorLoading} = useQuery({
    queryKey: ["allComments"],
    queryFn: async () => {
      const res = await axios.get("/api/comments/all")
      return res.data
    }
  })
  
  // all comments
  const {data: recentComments, isLoading: recentCommentsLoading, error: recentCommentsErrorLoading} = useQuery({
    queryKey: ["recentComments"],
    queryFn: async () => {
      const res = await axios.get("/api/comments/recent")
      return res.data
    }
  })

  // top posts
  const {data: topPosts, isLoading: topPostsLoading, error: topPostsError} = useQuery({
    queryKey: ["topPosts"],
    queryFn: async () => {
      const res = await axios.get("/api/posts/top")
      return res.data.topPosts
    }
  })

  
  console.log("topposts, ", topPosts)
  // if(topPostsLoading) return <p>loading...</p>
  return (
    <div className='flex flex-col px-6 max-sm:px-0 py-3'>
        <h2 className='text-2xl font-bold py-2 mb-2'>Dashboard</h2>
        
        <div className="flex gap-4 flex-wrap justify-between items-center">
          <DashComponent 
            image = "post.svg"
            count = {allPosts?.postCount}
            title = "Total posts"
            rate = {allPosts?.rate}
            loading = {allPostsLoading}
          />

          <DashComponent 
            image = "comment.svg"
            count = {allComments?.commentCount}
            title = "Total comments"
            rate = {allComments?.rate}
            loading = {allCommentsLoading}
          />

          <DashComponent 
            image = "post.svg"
            count = {recentPosts?.postCount}
            title = "Recent posts"
            rate = {recentPosts?.rate}
            loading = {recentPostsLoading}
          />

          <DashComponent 
            image = "comment.svg"
            count = {recentComments?.commentCount}
            title = "Recent comments"
            rate = {recentComments?.rate}
            loading = {recentCommentsLoading}
          />
        </div>

        {/* top posts and comments */}
        <div className="flex justify-between gap-8 mb-4 mt-4 flex-wrap max-xl:flex-col">
          <Card className='w-full flex-2 px-4 py-2'>
            <CardHeader className='p-0 flex justify-between px-8'>
              <h2 className='text-2xl font-bold py-2 capitalize'>top posts</h2>
              <Button variant="link" className='cursor-pointer capitalize text-gray-500'>view all</Button>
            </CardHeader>

            <CardContent className='p-0 flex flex-wrap justify-around items-center gap-y-2'>
              {
                topPostsLoading ? 
                Array.from({length: 6}).map((_, i) => (
                  <TopPostCard 
                    key={i}
                    loading={topPostsLoading}
                  />
                ))
                :
                topPosts?.map((topPost: TopPostCardT) => (
                  <TopPostCard 
                    key={topPost?.id}
                    thumbnail = {topPost?.thumbnail}
                    title = {topPost?.title}
                    url = {topPost?.url}
                    comments= {topPost?.comments}
                    shares = {topPost?.shares}
                    timeAgo = {topPost?.timeAgo}
                    loading = {topPostsLoading}
                  />
                ))
              }
            </CardContent>
          </Card>


          {/* comments */}

            <Card className='w-full flex-1'>
              <CardHeader className='p-0 flex justify-between items-center px-8 max-md:px-4 max-sm:px-2'>
                <h2 className='text-2xl max-md:text-xl max-sm:text-lg font-bold py-2 capitalize'>top comments</h2>
                <Button variant="link" className='cursor-pointer capitalize text-gray-500 max-md:text-xs'>view all</Button>
              </CardHeader>

              <CardContent className='p-2 flex flex-col flex-wrap justify-around items-center gap-y-2'>
                <TopCommentCard />
                <TopCommentCard />
                <TopCommentCard />
                <TopCommentCard />
                <TopCommentCard />
                <TopCommentCard />
              </CardContent>
            </Card>

        </div>


    </div>
  )
}
