import './App.css';
import {useState, useEffect} from 'react'
import Header from './component/Header'
import Tasks from './component/Tasks';
import AddTask from './component/AddTask';


function App() {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)


 

  useEffect(() => {
    const getTask = async () => {
      let tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }

    getTask()
  }, [])

  // fetch task
  const fetchTasks = async () => {
    let res = await fetch('http://localhost:5000/tasks')
    let data = await res.json()
    return data
  }


  const fetchTask = async(id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
  }


  const addTask = async (task) => {

    const res =   await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    res.status === 200 
      ? setTasks(tasks.filter((task) => task.id != id))
      : alert('Error Deleteing this Task')
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ?  {...task ,reminder : data.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd= {() => setShowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
      {showAddTask === true ? <AddTask onAdd={addTask}/> : ''}
       {tasks.length > 0 ? <Tasks tasks ={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks> : 'No Task!!!'}
    </div>
  );
}



export default App;
