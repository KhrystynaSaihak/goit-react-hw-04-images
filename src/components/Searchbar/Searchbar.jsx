import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchbarFormBox,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(query);
    e.target.seachField.value = '';
    setQuery('');
  };

  return (
    <SearchbarFormBox>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormBtn type="submit">
          <FaSearch />
        </SearchFormBtn>

        <SearchFormInput
          name="seachField"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
    </SearchbarFormBox>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
