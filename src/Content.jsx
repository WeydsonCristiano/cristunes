import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class Content extends React.Component {
  render() {
    const { musicFavoritas, loading, onInpuntChanger } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route
          exact
          path="/album/:id"
          render={ (props) => (<Album
            { ...props }
            musicFavoritas={ musicFavoritas }
            loading={ loading }
            onInpuntChanger={ onInpuntChanger }
          />) }
        />
        <Route
          exact
          path="/favorites"
          render={ () => (<Favorites
            musicFavoritas={ musicFavoritas }
            loading={ loading }
            onInpuntChanger={ onInpuntChanger }
          />) }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
Content.propTypes = {
  musicFavoritas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  onInpuntChanger: PropTypes.func.isRequired,
};
export default Content;
