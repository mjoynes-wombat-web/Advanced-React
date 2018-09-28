import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    password: '',
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
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              await signin();
              this.setState({ email: '', password: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into Your Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
              </label>
              <label htmlFor="password">
                Password
                <input type="password" name="password" placeholder="password" value={password} onChange={this.saveToState} />
              </label>
            </fieldset>
            <button type="submit">Sign In</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

Signin.propTypes = {

};

export default Signin;
