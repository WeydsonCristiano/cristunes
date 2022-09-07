import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';
import '../Styles/Header.css';
import image from '../assets/logo2.svg';
import User from '../assets/user.svg';

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
    const { location: { pathname } } = this.props;
    return (
      <div>
        {loading ? <Loading /> : (
          <header data-testid="header-component">
            <div className="imagenClass">
              <Link to="/">
                <img src={ image } alt="logo" width="150px" height="150px" />
              </Link>
              <div className="userClass">
                <img src={ User } alt="user" />
                <p
                  data-testid="header-user-name"
                >
                  {user.name}
                </p>
              </div>

            </div>
            <nav className="navClass">
              <ul>
                <li>
                  <Link
                    data-testid="link-to-search"
                    to="/search"
                    style={ { backgroundColor: `${pathname
                      === '/search' ? 'grey' : 'azure'}` } }
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    data-testid="link-to-favorites"
                    to="/favorites"
                    style={ { backgroundColor: `${pathname
                    === '/favorites' ? 'grey' : 'azure'}` } }
                  >
                    Favoritas
                  </Link>
                </li>
                <li>
                  <Link
                    data-testid="link-to-profile"
                    to="/profile"
                    style={ { backgroundColor: `${pathname
                    === '/profile' ? 'grey' : 'azure'}` } }
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Header);
