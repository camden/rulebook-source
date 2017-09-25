// @flow

import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import styled from 'styled-components';

import ProgressBar from 'components/ProgressBar';
import SearchResult from 'components/SearchResult';
import { searchByTitle } from 'utils';

const SearchBar = styled(DebounceInput)`
  border: none;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 250ms ease;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const SearchResultList = styled.div`max-width: 600px;`;

class Search extends Component {
  state: {
    searchLoading: boolean,
    searchText: string,
    searchResults: Array<{ title: string, name: string }>,
    finishedSearching: boolean,
  };

  handleSearchChange: Function;
  search: Function;

  constructor(props) {
    super(props);
    this.state = {
      searchLoading: false,
      searchText: '',
      searchResults: [],
      finishedSearching: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      searchLoading: true,
    });

    this.search(event.target.value);
  }

  async search(query: string) {
    let searchResults = [];
    if (query !== '') {
      searchResults = await searchByTitle({ query });
    }

    this.setState({
      searchResults,
      searchLoading: false,
      finishedSearching: true,
    });
  }

  searchResultList() {
    return (
      <SearchResultList>
        {this.state.searchResults.map(result => {
          return (
            <SearchResult
              title={result.title}
              name={result.name}
              key={result.name}
            />
          );
        })}
        {this.state.finishedSearching
          ? <SearchResult
              title={
                "Don't see what you're looking for? Contribute a new rulebook!"
              }
              linkTo={'#'}
            />
          : null}
      </SearchResultList>
    );
  }

  render() {
    return (
      <div>
        <ProgressBar
          loading={this.state.searchLoading}
          relative={true}
          height={'0.1rem'}
        />
        <SearchBar
          placeholder={'Search for rulebooks'}
          debounceTimeout={250}
          onChange={this.handleSearchChange}
        />
        <div>
          {this.searchResultList()}
        </div>
      </div>
    );
  }
}

export default Search;
