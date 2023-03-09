import PropTypes from 'prop-types';

import React from 'react';
import { Component } from 'react';
import {
  SearchbarFormBox,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  static propTypes = {
    props: PropTypes.node,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <SearchbarFormBox>
        <SearchForm onSubmit={this.props.onSubmit}>
          <SearchFormBtn type="submit">
            <FaSearch />
          </SearchFormBtn>

          <SearchFormInput
            name="seachField"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.query}
          />
        </SearchForm>
      </SearchbarFormBox>
    );
  }
}
