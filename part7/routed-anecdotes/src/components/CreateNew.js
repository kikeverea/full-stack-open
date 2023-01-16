import { useState } from 'react'

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    maxWidth: 300
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={ handleSubmit }>
        <div style={{ display:'flex', flexDirection: 'column', gap: 8 }}>
          <div style={ rowStyle }>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div style={ rowStyle }>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div style={ rowStyle }>
            url for more info
            <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
          </div>
        </div>
        <button style={{ margin: '8px 0 8px 0' }}>create</button>
      </form>
    </div>
  )
}

export default CreateNew