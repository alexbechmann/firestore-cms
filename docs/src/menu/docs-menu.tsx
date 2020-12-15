import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql, StaticQuery } from 'gatsby';
import { MenuItem, MenuList, Paper, makeStyles, ListItem, List, ListSubheader, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listSection: {
    marginBottom: theme.spacing(3)
  }
}));

const QUERY = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      nodes {
        frontmatter {
          title
          path
          section
        }
      }
    }
  }
`;

export default () => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={QUERY}
      render={data => {
        let sections = data.allMarkdownRemark.nodes.map(node => node.frontmatter.section);
        sections = Array.from(new Set(sections));
        console.log(sections);
        return (
          <List dense>
            {sections.map(section => {
              return (
                <div className={classes.listSection}>
                  <ListSubheader>{section}</ListSubheader>
                  {data.allMarkdownRemark.nodes
                    .filter(node => node.frontmatter.section === section)
                    .map(node => {
                      return (
                        <ListItem
                          button
                          component={(props: any) => <GatsbyLink {...props} to={node.frontmatter.path} />}
                        >
                          <ListItemText primary={node.frontmatter.title} />
                        </ListItem>
                      );
                    })}
                </div>
              );
            })}
          </List>
        );
      }}
    />
  );
};
