import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    api: [],
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
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
        {api.length > 0 && api.map((e, index) => (
          <MusicCard
            key={ index }
            trackName={ e.trackName }
            previewUrl={ e.previewUrl }
          />
        )) }
      </div>
    );
  }
}

export default Album;
