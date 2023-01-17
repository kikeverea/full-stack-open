import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
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

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={ handleSubmit }>
        <div style={{ display:'flex', flexDirection: 'column', gap: 8 }}>
          <div style={ rowStyle }>
            content
            <input {...content} />
          </div>
          <div style={ rowStyle }>
            author
            <input {...author} />
          </div>
          <div style={ rowStyle }>
            url for more info
            <input {...info} />
          </div>
        </div>
        <button style={{ margin: '8px 4px 8px 0' }}>create</button>
        <button type='button' style={{ margin: '8px 0 8px 4px' }} onClick={ resetFields }>reset</button>
      </form>
    </div>
  )
}

export default CreateNew