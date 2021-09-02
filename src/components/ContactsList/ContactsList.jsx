import PropTypes from 'prop-types'
import addClassNames from '../../utils/addClassNames';
import style from '../ContactsList/ContactsList.module.css'
import IconButton, {
  deleteContactBtnClassNames,
} from "../IconButton/IconButton";
import { ReactComponent as IconCross } from '../../image/cross.svg';


const ContactsList = ({ contacts, deleteContactsButton }) => {
  const contactsListNames = addClassNames('list');
  const contactNameNames = addClassNames('link');
  return (
    <ul className={contactsListNames}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={style.contactsList}>
          <p>{name} - </p>
          <a href={`telephone: ${number}`} className={contactNameNames}>
            {number}
          </a>

          <IconButton
            type="button"
            ariaLabel="Delete contact button"
            width="40"
            height="40"
            onClick={() => deleteContactsButton(id)}
            className={deleteContactBtnClassNames}
          >
            <IconCross width="20" height="20" />
          </IconButton>

          {/* <button
            className={style.contactsButton}
            type="button"
            onClick={() => deleteContactsButton(id)}
            aria-label="Delete contact button"
          >
            delete
          </button> */}
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContactsButton: PropTypes.func.isRequired,
};

export default ContactsList;
