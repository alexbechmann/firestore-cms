import React from 'react';
import Link, { navigate } from 'gatsby-link';
import Helmet from 'react-helmet';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  createStyles,
  Theme,
  Grid,
  withStyles,
  WithStyles,
  createMuiTheme,
  IconButton,
  Button,
  Container
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-roboto';
import GitHub from '../icons/GitHub';
import { indigo } from '@material-ui/core/colors';
const favicon = require('../assets/favicon.ico');
import withRoot from '../with-root';
import { compose } from 'recompose';
import { theme } from '../theme';

interface LayoutProps {
  title: string;
}

const styles = (theme: Theme) =>
  createStyles({
    '@global h1, h2, h3, p': {
      // color: 'white',
      fontFamily: 'Roboto'
    },
    // '@global a': {
    //   color: theme.palette.primary.main
    // },
    content: {
      padding: theme.spacing()
    },
    grow: {
      flexGrow: 1
    },
    appBar: {
      marginBottom: theme.spacing(3),
      background: 'white'
    },
    title: {
      marginBottom: theme.spacing(3)
    },
    logo: {
      marginRight: theme.spacing(),
      height: 30
    }
  });

interface Props extends LayoutProps, WithStyles<typeof styles> {}

const Layout: React.ComponentType<Props> = ({ title, children, classes }) => (
  <ThemeProvider theme={theme}>
    <AppBar position="sticky" className={classes.appBar} elevation={1}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <img className={classes.logo} src="/avumt-3eeeh-003.png" />
          <Typography color="primary" variant="h6">
            <Link to="/" style={{ textDecoration: 'none' }}>
              Refract Cms
            </Link>
          </Typography>
          <div className={classes.grow} />
          <Button component="a" onClick={() => navigate('/screenshots')}>
            Screenshots
          </Button>
          <Button component="a" onClick={() => navigate('/cli')}>
            Docs
          </Button>
          <IconButton href="https://github.com/alexbechmann/refract-cms">
            <GitHub />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
      link={[{ rel: 'icon', href: `${favicon}` }]}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Helmet>
    <CssBaseline />
    <Container maxWidth="md">{children}</Container>
  </ThemeProvider>
);

export default compose(withRoot, withStyles(styles))(Layout) as React.ComponentType<LayoutProps>;
