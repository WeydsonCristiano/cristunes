import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    bandas: '',
  };

  handleChanger = ({ target: { value } }) => {
    this.setState({ bandas: value });
  };

  render() {
    const magicNumber = 2;
    const { bandas } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <div>
          <label htmlFor="bandas">
            Banda Favorita
            <input
              id="bandas"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChanger }
              value={ bandas }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ bandas.length < magicNumber }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
