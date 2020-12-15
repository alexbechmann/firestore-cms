import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import { Grid, Paper, Theme, withStyles } from '@material-ui/core';
import DocsMenu from '../menu/docs-menu';

const styles = (theme: Theme) => ({
  rte: {
    '& img': {
      maxWidth: '100%'
    },
    '& h1': {
      ...theme.typography.h4
    },
    '& h2': {
      ...theme.typography.h5
    },
    '& h3': {
      ...theme.typography.h6
    },
    // '& h4': {
    //   ...theme.typography.h4
    // },
    // '& h5': {
    //   ...theme.typography.h5
    // },
    // '& h6': {
    //   ...theme.typography.h6
    // },
    '& a': {
      color: theme.palette.primary.main
    },
    '& a:hover': {
      color: theme.palette.primary.dark
    }
    // textAlign: 'justify',
    // textJustify: 'inter-word'
  }
});

class DocsTemplate extends Component<any> {
  render() {
    const { markdownRemark: page } = this.props.data;
    return (
      <Layout title={page.frontmatter.title}>
        <Helmet title={page.frontmatter.title} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper>
              <DocsMenu />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className={this.props.classes.rte} dangerouslySetInnerHTML={{ __html: page.html }} />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}
export default withStyles(styles)(DocsTemplate);

export const pageQuery = graphql`
  query DocsByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
