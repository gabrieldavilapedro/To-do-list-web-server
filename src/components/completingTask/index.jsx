import './completingTask.css';
import PropTypes from 'prop-types';

        const CompletingTask = ({ checked, id, toggleCheck}) => {

            return (
                <div>
                <button 
                    onClick={()=> toggleCheck(id, !checked)} 
                    className={checked ? 'completed' : 'not-completed'}
                >
                    {!checked ? 'Completar tarefa' : 'Descompletar tarefa'}
                </button>
            </div>
            );
        };

        CompletingTask.propTypes = {
            id: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
            toggleCheck: PropTypes.func.isRequired,

        };

        export default CompletingTask;