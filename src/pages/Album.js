import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class Album extends React.Component {
  state = {
    api: [],
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    this.setState({
      api: musica,
    });
  }

  onInpuntChanger = async (music) => {
    this.setState({
      loading: true });
    await addSong(music);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { api, loading } = this.state;
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
                {api.length > 0 && api.reduce((Acc, e, index) => {
                  if (index !== 0) {
                    Acc.push(
                      <MusicCard
                        key={ index }
                        onInpuntChanger={ this.onInpuntChanger }
                        objTrack={ e }
                      />,
                    );
                  }
                  return Acc;
                }, []) }
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
