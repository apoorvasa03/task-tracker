import {FaTimes} from 'react-icons/fa'


const Task = ({task, onDelete, onToggle}) => {
    const onClick = () => {
        console.log('hi')
    }
    return (
        <div className={`task ${task.reminder === true ? 'reminder': ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color:'red'}} onClick={()=> onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
