import './App.css'
import MovieList from './components/Movie/MovieList'

function App() {

  return (
   <div className="App">
    <header className="app__header">
      <h2>Movies</h2>
    </header>
    <main className="app_main">
      <MovieList />
    </main>
   </div>
  )
}

export default App
