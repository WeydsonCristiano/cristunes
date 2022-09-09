import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import { updateUser, getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    habilitar: false,
    loading: false,
    user: {},
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.getUsuario();
  }

  onChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  onClickButton = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { name,
        email,
        image,
        description } = this.state;
      await updateUser({
        name,
        email,
        image,
        description,
      });
      this.setState({
        loading: false,
        habilitar: true,
      });
    });
  };

  getUsuario = async () => {
    const usuario = await getUser();
    this.setState({ user: usuario });
  };

  render() {
    const { user,
      name,
      email,
      image,
      description,
      loading,
      habilitar } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="image">
              Foto:
              <input
                name="image"
                data-testid="edit-input-image"
                src={ user.image }
                alt="User"
                value={ image }
                onChange={ this.onChange }
              />
            </label>
            <label htmlFor="name">
              Name:
              <input
                name="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.onChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                name="email"
                data-testid="edit-input-email"
                type="email"
                value={ email }
                onChange={ this.onChange }
              />
            </label>
            Descição:
            <textarea
              name="description"
              data-testid="edit-input-description"
              onChange={
                this.onChange
              }
              type="text"
              value={ description }
            >
              { user.description }
            </textarea>
            <button
              data-testid="edit-button-save"
              type="button"
              onClick={ this.onClickButton }
              disabled={ nome.length === "" }
            >
              Salvar

            </button>
            {(habilitar) && (
              <Redirect to="/profile" />
            )}
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
