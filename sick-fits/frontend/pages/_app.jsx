import React from 'react';
import App, { Container } from 'next/app';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';

import withData from '../lib/withData';
import Page from '../components/Page';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // This exposes the query to user.
    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

MyApp.propTypes = {

};

export default withData(MyApp);
