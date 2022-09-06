import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';
import img from '../assets/logo2.svg';

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
      <div className="divLogin" data-testid="page-login">
        <img src={ img } alt="logo" width="150px" height="150px" />
        login:
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
