import  { useState } from 'react';
import './completingTask.css';
import PropTypes from 'prop-types';

        const CompletingTask = ({ checked }) => {
            const [isChecked, setIsChecked] = useState(checked);

            const handleButtonClick = () => {
                setIsChecked(!isChecked);
                // chamar a API para atualizar o estado da tarefa
            };

            return (
                <div>
                <button 
                    onClick={handleButtonClick} 
                    className={isChecked ? 'completed' : 'not-completed'}
                >
                    {!isChecked ? 'Completar tarefa' : 'Descompletar tarefa'}
                </button>
            </div>
            );
        };

        CompletingTask.propTypes = {
            id: PropTypes.number.isRequired,
            checked: PropTypes.bool.isRequired,
        };

        export default CompletingTask;