// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';

import type { RulebookType } from 'types';

import config from 'config';
import ProgressBar from 'components/shared/ProgressBar';
import SearchResult from 'components/home/SearchResult';
import { searchByTitle } from 'utils';

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

class Search extends Component {
  state: {
    searchLoading: boolean,
    searchText: string,
    searchResults: Array<RulebookType>,
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
    const query = event.target.value;

    this.setState({
      searchLoading: true,
    });

    if (query === '') {
      this.setState({
        searchLoading: false,
        finishedSearching: false,
        searchResults: [],
      });
      return;
    }

    this.search(query);
  }

  async search(query: string) {
    if (config.localSearch) {
      let allRulebooks = this.props.allRulebooks;

      const lowercaseQuery = query.toLowerCase();
      const filteredRulebooks = allRulebooks.filter(
        rulebook =>
          rulebook.title.toLowerCase().includes(lowercaseQuery) ||
          rulebook.name.toLowerCase().includes(lowercaseQuery)
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
        <FlipMove
          duration={250}
          staggerDurationBy={15}
          staggerDelayBy={20}
          easing="ease"
          appearAnimation="fade"
          enterAnimation="fade"
          leaveAnimation="fade"
          maintainContainerHeight={true}
        >
          {this.state.searchResults.map(result => {
            return (
              <SearchResult
                key={result.name}
                title={result.title}
                name={result.name}
                tags={result.tags}
              />
            );
          })}
          {this.state.finishedSearching ? (
            <SearchResult
              key={'rulebook-not-found'}
              title={
                "Don't see what you're looking for? Contribute a new rulebook!"
              }
              linkTo={'/how-to-help'}
            />
          ) : null}
        </FlipMove>
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
          debounceTimeout={config.localSearch ? 250 : 250}
          onChange={this.handleSearchChange}
        />
        <div>{this.searchResultList()}</div>
      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  allRulebooks: PropTypes.array.isRequired,
};

export default Search;
