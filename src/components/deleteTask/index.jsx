import PropTypes from 'prop-types';
import trashCan from '../../assets/trash-can-icon.svg';
import { deleteTask } from '../../requests/tasks';

const DeleteTask = ({ id, setTasks }) => {
  const handleDeleteTask = () => {
    deleteTask(id).then(() => {
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    });
  };

  return <img onClick={handleDeleteTask} src={trashCan} alt="icon" />;
};

DeleteTask.propTypes = {
  id: PropTypes.string.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default DeleteTask;
