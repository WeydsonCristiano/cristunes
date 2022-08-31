import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
    habilitar: false,
  };

  handleClick = () => {
    const { nome } = this.state;
    this.setState({ habilitar: true });
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      this.setState({ loading: false });
    });
  };

  render() {
    const { nome, loading, habilitar } = this.state;
    const magicNumber = 3;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ ({ target: { value } }) => this.setState({ nome: value }) }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ this.handleClick }
          disabled={ nome.length < magicNumber }
        >
          Entrar
        </button>
        {loading && (
          <Loading />
        )}
        {(!loading && habilitar) && (
          <Redirect to="/search" />
        )}
      </div>
    );
  }
}

export default Login;
