import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        login
        <input
          data-testid="login-name-input"
          type="text"
          name="login"
          id="login"
          placeHolder="user"
        />
        <button
          data-testid="login-submit-button"
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
