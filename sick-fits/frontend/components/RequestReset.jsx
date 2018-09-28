import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
  }

  saveToState = (e) => {
    const { target } = e;

    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, name, password } = this.state;
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(reset, { error, loading, called }) => (
          <Form
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              await reset();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a Password Reset</h2>
              <Error error={error} />
              {!error && !loading && called && <p>Success! Check your email for a reset link.</p>}
              <label htmlFor="email">
                Email
                <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
              </label>
            </fieldset>
            <button type="submit">Request Reset</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

Signin.propTypes = {

};

export default Signin;
