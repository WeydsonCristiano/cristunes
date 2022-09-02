import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    api: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    this.setState({
      api: musica,
    });
  }

  render() {
    const { api } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{api.length > 0 && api[0].artistName}</h2>
          <h2 data-testid="album-name">{api.length > 0 && api[0].collectionName}</h2>
        </div>
        <ul>
          {api.length > 0 && api.reduce((Acc, e, index) => {
            if (index !== 0) {
              Acc.push(
                <MusicCard
                  key={ index }
                  objTrack={ e }
                />,
              );
            }
            return Acc;
          }, []) }
        </ul>
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
