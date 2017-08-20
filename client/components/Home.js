// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ProgressBar from 'components/ProgressBar';
import { fetchAllRulebooks } from 'utils';

const HomeWrapper = styled.div`padding: 0 2rem;`;

export default class Home extends Component {
  state: {
    data: {
      allRulebooks: Array<string>,
    },
    loading: boolean,
  };

  constructor() {
    super();

    this.state = {
      data: {
        allRulebooks: [],
      },
      loading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const response = await fetchAllRulebooks();
    const allRulebooks: Array<string> = response.data;

    this.setState({
      data: {
        allRulebooks: allRulebooks,
      },
      loading: false,
    });
  }

  rulebookInfo({ rulebookName }: { rulebookName: string }) {
    return (
      <div>
        <Link to={`/rules/${rulebookName}`}>
          {rulebookName}
        </Link>
      </div>
    );
  }

  render() {
    return (
      <HomeWrapper>
        <ProgressBar loading={this.state.loading} />
        <h1>Welcome to Rulebook.io!</h1>
        <h3>Here are all of the rulebooks available:</h3>
        {this.state.data.allRulebooks.map(rulebookName =>
          this.rulebookInfo({ rulebookName })
        )}
      </HomeWrapper>
    );
  }
}
