import style from '../Filter/Filter.module.css'
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange }) => {
  return (
    <label>
      <p className={style.filterLitleTitle}>Find contacts by name:</p>
      <input
        className={style.filterInput}
        type="text"
        onChange={onFilterChange}
      />
    </label>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
export default Filter;