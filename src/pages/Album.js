import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class Album extends React.Component {
  state = {
    api: [],
    loading: false,
    musicFavoritas: [],
  };

  async componentDidMount() {
    await this.requisicaoFavoritos();
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    this.setState({
      api: musica,
    });
  }

  requisicaoFavoritos = async () => {
    const retornoFavoritos = await getFavoriteSongs();
    this.setState({
      musicFavoritas: retornoFavoritos,
    });
  };

  onInpuntChanger = async (music) => {
    this.setState({
      loading: true });
    const { musicFavoritas } = this.state;
    if (musicFavoritas.some((e) => e.trackId === music.trackId)) {
      await removeSong(music);
      await this.requisicaoFavoritos();
    } else {
      await addSong(music);
      await this.requisicaoFavoritos();
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { api, loading, musicFavoritas } = this.state;
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
                        onInpuntChanger={ this.onInpuntChanger }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
