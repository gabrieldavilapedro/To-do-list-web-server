import PropTypes from 'prop-types';
import checkedIcon from '../../assets/checked-icon.svg';
import uncheckedIcon from '../../assets/unchecked-icon.svg';
import { toggleCheck } from '../../requests/tasks';

const CompletingTask = ({ checked, id, setTasks }) => {
  const handleUpdateTask = () => {
    toggleCheck(id).then((tasks) => setTasks(tasks));
  };

  if (checked) {
    return (
      <img onClick={() => handleUpdateTask(id)} src={checkedIcon} alt="icon" />
    );
  }
  return (
    <img onClick={() => handleUpdateTask(id)} src={uncheckedIcon} alt="icon" />
  );
};

CompletingTask.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default CompletingTask;
