import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {}

  render() {
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name" />
      </header>

    );
  }
}
export default Header;
