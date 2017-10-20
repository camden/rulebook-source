// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import frontMatter from 'front-matter';
import { anchorate } from 'anchorate';
import { Helmet } from 'react-helmet';
import { Base64 } from 'js-base64';

import config from 'config';
import RulebookPanels from 'components/rulebook/RulebookPanels';
import ProgressBar from 'components/shared/ProgressBar';
import { fetchRulebookData } from 'utils';
import { compileMarkdown } from 'markdown-utils';

export default class Rulebook extends Component {
  state: {
    ui: {
      sidebarOpen: boolean,
    },
    data: {
      front_matter: Object,
      markdown: Array<Object>,
      toc: Array<Object>,
    },
    not_found: boolean,
    loading: boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      ui: {
        sidebarOpen: false,
      },
      data: {
        front_matter: {},
        markdown: [],
        toc: [],
      },
      not_found: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.customMarkdown !== nextProps.customMarkdown) {
      this.loadData();
    }
  }

  async loadData() {
    let rulebookContent = this.props.customMarkdown;

    if (rulebookContent === undefined || rulebookContent === null) {
      const rulebookName = this.rulebookName();

      const response = await fetchRulebookData({
        rulebookName: rulebookName,
      });

      if (response.status === 404) {
        this.setState({
          loading: false,
          not_found: true,
        });
        return;
      }

      let rulebookData = response.data;

      if (!rulebookData) {
        throw new Error('response must have data property.');
      }

      // Base64 string decoding
      rulebookContent = Base64.decode(rulebookData);
    }

    const markdown = frontMatter(rulebookContent);

    const frontMatterData = markdown.attributes;

    const compiledMarkdown = compileMarkdown({
      markdown: markdown.body,
      glossary: frontMatterData.glossary,
    });

    const toc = compiledMarkdown.toc;
    const markdownData = compiledMarkdown.tree;

    this.setState(
      {
        data: {
          front_matter: frontMatterData,
          markdown: markdownData,
          toc: toc,
        },
        loading: false,
      },
      this.finishedLoading
    );
  }

  finishedLoading() {
    anchorate();
  }

  toggleSidebar() {
    const newUIState = Object.assign({}, this.state.ui, {
      sidebarOpen: !this.state.ui.sidebarOpen,
    });

    this.setState({
      ui: newUIState,
    });
  }

  rulebookName() {
    return this.props.match.params.rulebookName;
  }

  title() {
    let title = this.state.data.front_matter.title || this.rulebookName();
    title = title + ' - Rulebook.io';
    if (this.state.not_found) {
      title = 'Rulebook Not Found';
    }
    return title;
  }

  ogTitle() {
    return `${this.title()} - Rulebook.io`;
  }

  ogType() {
    return 'website';
  }

  ogUrl() {
    return `${config.homeUrl}/rules/${this.rulebookName()}`;
  }

  description() {
    let description = `Rulebook for ${this.title()}.`;
    if (this.state.not_found) {
      description = `Rulebook ${this.rulebookName()} not found.`;
    }
    return description;
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Helmet defer={false}>
          <meta property="og:title" content={this.ogTitle()} />
          <meta property="og:type" content={this.ogType()} />
          <meta property="og:description" content={this.description()} />
          <meta property="og:url" content={this.ogUrl()} />
          <title>{this.title()}</title>
          <meta name="description" content={this.description()} />
        </Helmet>
        <RulebookPanels
          data={this.state.data}
          rulebookName={this.rulebookName()}
          not_found={this.state.not_found}
        />
        <ProgressBar loading={this.state.loading} />
      </div>
    );
  }
}

Rulebook.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      rulebookName: PropTypes.string,
    }),
  }).isRequired,
  customMarkdown: PropTypes.string,
};
