import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Content';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';

class App extends React.Component {
  state = {
    loading: false,
    musicFavoritas: [],
  };

  async componentDidMount() {
    await this.requisicaoFavoritos();
  }

  requisicaoFavoritos = async () => {
    const retornoFavoritos = await getFavoriteSongs();
    console.log(retornoFavoritos);
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
    const { musicFavoritas, loading } = this.state;
    return (
      <BrowserRouter>
        <p className="titulo">Cris tunes</p>
        <Content
          musicFavoritas={ musicFavoritas }
          loading={ loading }
          onInpuntChanger={ this.onInpuntChanger }
        />
      </BrowserRouter>
    );
  }
}

export default App;
