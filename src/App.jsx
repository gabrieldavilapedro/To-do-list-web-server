import 'styles/App.css'
import RenderTasks from './components/RenderTasks'
function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>To-do-list</h1>
        </header>
        <RenderTasks />
      </div>
    </>
  )
}

export default App
