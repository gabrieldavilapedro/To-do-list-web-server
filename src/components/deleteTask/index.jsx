import PropTypes from 'prop-types';
import trashCan from '../../assets/trash-can-icon.svg';

const DeleteTask = ({ id, deleteTask }) => {
  return <img onClick={() => deleteTask(id)} src={trashCan} alt="icon" />;
};

DeleteTask.propTypes = {
  id: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default DeleteTask;
