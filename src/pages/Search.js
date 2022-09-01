import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Loading';

class Search extends React.Component {
  state = {
    loading: false,
    pesquisar: '',
  };

  componentDidMount() {
    this.pesquisarBotao();
  }

  handleChanger = ({ target: { value } }) => {
    this.setState({ pesquisar: value });
  };

  pesquisarBotao = async () => {
    const { pesquisar, loading } = this.state;
    this.setState( loading: true );
    const resultadoPesquisa = await searchAlbumsAPI({ pesquisar });
    this.setState({
      pesquisa: resultadoPesquisa,
      loading: false,
    });
  };

  render() {
    const magicNumber = 2;
    const { pesquisar } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <div>
          <label htmlFor="pesquisar">
            Banda Favorita
            <input
              id="pesquisar"
              name="pesquisar"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChanger }
              value={ pesquisar }
            />
          </label>
          <button
            data-testid="search-artist-button"
            onClick={ this.pesquisarBotao }
            type="button"
            disabled={ pesquisar.length < magicNumber }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
