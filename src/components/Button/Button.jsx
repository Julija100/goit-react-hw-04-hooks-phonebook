import addClassNames from "../../utils/addClassNames";
import PropTypes from 'prop-types';
import style from '../Button/Button.module.css';

const Button = ({ children, type }) => {
    const buttonClassNames = addClassNames('button', style.addContactButton);
    
    return (<button type={type} className={buttonClassNames}>
        {children}
    </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string.isRequired,
};

export default Button;