import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
  };

  render() {
    const {
      objTrack: { trackName, previewUrl, trackId },
      objTrack,
      onInpuntChanger } = this.props;
    return (
      <div>
        <label
          htmlFor="favorita"
        >
          favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="favorita"
            name="favorita"
            type="checkbox"
            checked="true"
            onClick={ () => onInpuntChanger(objTrack) }
          />
        </label>
        <li>
          <p>{ trackName }</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </li>

      </div>
    );
  }
}

MusicCard.propTypes = {
  objTrack: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onInpuntChanger: PropTypes.func.isRequired,
};

export default MusicCard;
