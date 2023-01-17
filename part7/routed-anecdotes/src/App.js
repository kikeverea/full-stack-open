import { useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'https://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    showNotification(anecdote.content)
  }

  const showNotification = (content) => {
    setNotification(`Anecdote '${ content }' created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)
  //
  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }
  //
  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === parseInt(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        { ['/', '/anecdotes']
          .map(path => {
            return(
              <Route key={ path } path={ path } element={
                <AnecdoteList anecdotes={ anecdotes } notification = { notification } />}/>)}
          )
        }
        <Route path='/anecdotes/:id' element={ <Anecdote anecdote = { anecdote } /> }/>
        <Route path='/create' element={ <CreateNew addNew={ addNew } /> }/>
        <Route path='/about' element={ <About /> }/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
