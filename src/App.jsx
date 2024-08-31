import './App.css';
import RenderTasks from './components/renderTasks';
function App() {
  return (
    <>
      <div className="App">
        <div className="title">
          <h1>Lista de tarefas</h1>
        </div>
        <header className="App-header">
          <RenderTasks />
        </header>
      </div>
    </>
  );
}

export default App;
