import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Loading';

class Search extends React.Component {
  state = {
    loading: false,
    pesquisar: '',
    resultadoPesquisa: [],
    nomeArtista: '',
  };

  handleChanger = ({ target: { value } }) => {
    this.setState({ pesquisar: value });
  };

  pesquisarBotao = async () => {
    const { pesquisar } = this.state;
    this.setState({
      loading: true,
      pesquisar: '',
    });
    const resultadoPesquisa = await searchAlbumsAPI(pesquisar);
    this.setState({
      resultadoPesquisa,
      loading: false,
      nomeArtista: pesquisar,
    });
  };

  render() {
    const magicNumber = 2;
    const { pesquisar, loading, resultadoPesquisa, nomeArtista } = this.state;
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
        <h1>
          Resultado de álbuns de:
          { ' ' }
          {nomeArtista}
        </h1>
        <div>
          { loading && <Loading /> }
          {loading === false && (
            resultadoPesquisa < 1 && <p>Nenhum álbum foi encontrado</p>
          )}
          {resultadoPesquisa.length > 0 && resultadoPesquisa.map((e, index) => (
            <Link
              key={ index }
              to={ `/album/${e.collectionId}` }
              data-testid={ `link-to-album-${e.collectionId}` }
            >
              <div>
                <img src={ e.artworkUrl100 } alt={ e.artistName } />
                {e.collectionName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
