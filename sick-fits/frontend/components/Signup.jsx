import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state ={
    name: '',
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
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              await signup();
              this.setState({ name: '', email: '', password: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>
              <Error error={error} />
              <label htmlFor="email">
            Email
                <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
              </label>
              <label htmlFor="name">
            Name
                <input type="text" name="name" placeholder="name" value={name} onChange={this.saveToState} />
              </label>
              <label htmlFor="password">
            Password
                <input type="password" name="password" placeholder="password" value={password} onChange={this.saveToState} />
              </label>
            </fieldset>
            <button type="submit">Sign Up</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

Signup.propTypes = {

};

export default Signup;
