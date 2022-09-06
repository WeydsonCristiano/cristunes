import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';

class Album extends React.Component {
  state = {
    api: [],
  };

  async componentDidMount() {
    // await this.requisicaoFavoritos();
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    this.setState({
      api: musica,
    });
  }

  render() {
    const { api } = this.state;
    const { loading, musicFavoritas, onInpuntChanger } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading />

          : (
            <>
              <div>
                <h2
                  data-testid="artist-name"
                >
                  {api.length > 0 && api[0].artistName}

                </h2>
                <h2
                  data-testid="album-name"
                >
                  {api.length > 0 && api[0].collectionName}

                </h2>
              </div>
              <ul>
                {
                  api
                    .filter((_, index) => index !== 0)
                    .map((e, index) => (
                      <MusicCard
                        key={ index }
                        onInpuntChanger={ onInpuntChanger }
                        objTrack={ e }
                        localStorageData={ musicFavoritas }
                      />))
                }
              </ul>
            </>
          )}
      </div>

    );
  }
}

Album.propTypes = {
  musicFavoritas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  onInpuntChanger: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
