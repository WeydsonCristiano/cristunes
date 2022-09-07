import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';

class Favorites extends React.Component {
  state = {
  };

  render() {
    const { musicFavoritas, loading, onInpuntChanger } = this.props;
    console.log(musicFavoritas);
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : (
            <>
              { musicFavoritas.map((e, id) => (
                <MusicCard
                  key={ id }
                  onInpuntChanger={ onInpuntChanger }
                  objTrack={ e }
                  localStorageData={ musicFavoritas }
                />
              ))}
            </>
          )}
      </div>
    );
  }
}
Favorites.propTypes = {
  musicFavoritas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  onInpuntChanger: PropTypes.func.isRequired,
};
export default Favorites;
