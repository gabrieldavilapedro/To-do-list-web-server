import './App.css'
import NewTaskForm from './components/newTask'
function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>To-do-list</h1>
        </header>
        <NewTaskForm />
      </div>
    </>
  )
}

export default App
