import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    this.getUsuario();
  }

  getUsuario = async () => {
    const usuario = await getUser();
    this.setState({ user: usuario, loading: false });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <header data-testid="header-component">
            <h1 data-testid="header-user-name">{user.name}</h1>
            <Link data-testid="link-to-search" to="/search">search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">profile</Link>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
