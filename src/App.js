import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p className="titulo">Cris tunes</p>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
