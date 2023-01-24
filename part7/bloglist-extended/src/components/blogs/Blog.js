import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FlexRow, FlexColumn } from '../styled'
import HoverButton from '../HoverButton'
import { deleteBlog, likeBlog } from '../../reducers/blogsReducer'
import { useEffect } from 'react'
import { consumeUpdateState } from '../../reducers/updateBlogsState'
import { showFailNotification, showSuccessNotification } from '../../reducers/notificationReducer'
import Comments from './Comments'

const Blog = () => {

  const id = useParams().id
  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const loggedInUser = useSelector(state => state.loggedInUser)
  const updateBlogState = useSelector(state => state.updateBlogsState)

  useEffect(() => {
    if (updateBlogState) {
      dispatch(updateBlogState.result === 'success'
        ? showSuccessNotification(updateBlogState.content)
        : showFailNotification(updateBlogState.content))

      dispatch(consumeUpdateState())
    }
  }, [updateBlogState])

  const like = (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = (blog) => {
    const deleteConfirmed = window.confirm(`Remove blog '${ blog.title }'?`)

    if (deleteConfirmed)
      dispatch(deleteBlog(blog, loggedInUser))
  }

  return (
    blog ?
      <>
        <h1>{ blog.title }</h1>
        <FlexColumn style={{ gap: 16 }}>
          <a id='url' href={ blog.url }>{ blog.url }</a>
          <FlexRow>
            <div id='likes'>{ blog.likes }</div>
            <button onClick={ () => like(blog) }>like</button>
          </FlexRow>
          <div id='author'>added by { blog.author }</div>
          <HoverButton label={ 'remove' } color={ '#de1212' } handleOnClick={ () => remove(blog) }/>
          <Comments blog={ blog }/>
        </FlexColumn>
      </>
      : <Navigate replace to='/blogs'/>
  )
}

export default Blog