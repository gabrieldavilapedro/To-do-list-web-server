import PropTypes from 'prop-types';
import checkedIcon from '../../assets/checked-icon.svg';
import uncheckedIcon from '../../assets/unchecked-icon.svg';

const CompletingTask = ({ checked, id, toggleCheck }) => {
  if (checked) {
    return (
      <img
        onClick={() => toggleCheck(id, false)}
        src={checkedIcon}
        alt="icon"
      />
    );
  }
  return (
    <img onClick={() => toggleCheck(id, true)} src={uncheckedIcon} alt="icon" />
  );
};

CompletingTask.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleCheck: PropTypes.func.isRequired,
};

export default CompletingTask;
