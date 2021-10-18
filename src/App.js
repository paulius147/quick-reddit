import React from 'react'
import Navigation from './components/Navigation'
import Posts from './features/posts/Posts'
import Subreddits from './features/subreddits/Subreddits'

export default function App() {

  return (
    <div className='App'>
      <Navigation />
      <main className='main'>
        <Posts />
        <Subreddits />
      </main>
    </div>
  )
}
