import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';

class Profile extends React.Component {
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
    console.log(usuario);
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          <>
            <img
              data-testid="profile-image"
              src={ user.image }
              alt="User"
            />
            <p>{ user.name }</p>
            <p>{ user.email }</p>
            <p>{ user.description }</p>
          </>
        )}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
