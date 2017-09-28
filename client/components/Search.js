// @flow

import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import styled from 'styled-components';

import config from 'config';
import ProgressBar from 'components/ProgressBar';
import SearchResult from 'components/SearchResult';
import { fetchAllRulebooks, searchByTitle } from 'utils';

const SearchWrapper = styled.div`
  margin: 0 auto;

  @media (min-width: ${props => props.theme.media.desktop}) {
    width: 50%;
  }
`;

const SearchBar = styled(DebounceInput)`
  border: none;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 250ms ease;

  -webkit-appearance: none;
  border-radius: 0;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const SearchResultList = styled.div``;

type RulebookType = { title: string, name: string };

class Search extends Component {
  state: {
    allRulebooks: ?Array<Rulebook>,
    searchLoading: boolean,
    searchText: string,
    searchResults: Array<Rulebook>,
    finishedSearching: boolean,
  };

  handleSearchChange: Function;
  search: Function;

  constructor(props) {
    super(props);
    this.state = {
      allRulebooks: null,
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
    if (config.localSearch) {
      let allRulebooks = this.state.allRulebooks;
      if (!allRulebooks) {
        const response = await fetchAllRulebooks();
        allRulebooks = response.data;
        this.setState({ allRulebooks });
      }

      const filteredRulebooks = allRulebooks.filter(
        rulebook =>
          rulebook.title.includes(query) || rulebook.name.includes(query)
      );

      this.setState({
        searchResults: filteredRulebooks,
        searchLoading: false,
        finishedSearching: true,
      });
    } else {
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
        {this.state.finishedSearching ? (
          <SearchResult
            title={
              "Don't see what you're looking for? Contribute a new rulebook!"
            }
            linkTo={'/contribute'}
          />
        ) : null}
      </SearchResultList>
    );
  }

  render() {
    return (
      <SearchWrapper>
        <ProgressBar
          loading={this.state.searchLoading}
          relative={true}
          height={'0.2rem'}
        />
        <SearchBar
          placeholder={'Search for rulebooks'}
          debounceTimeout={250}
          onChange={this.handleSearchChange}
        />
        <div>{this.searchResultList()}</div>
      </SearchWrapper>
    );
  }
}

export default Search;
