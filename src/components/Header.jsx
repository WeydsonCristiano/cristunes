import React from 'react';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    this.xablau();
  }

  xablau = async () => {
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
          </header>
        )}
      </div>
    );
  }
}

export default Header;
