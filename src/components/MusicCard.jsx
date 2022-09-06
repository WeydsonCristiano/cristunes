import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
  };

  render() {
    const {
      objTrack: { trackName, previewUrl, trackId },
      objTrack,
      onInpuntChanger, localStorageData } = this.props;
    return (
      <div className="divMusicas">
        <label
          htmlFor="favorita"
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="favorita"
            name="favorita"
            type="checkbox"
            defaultChecked={
              localStorageData.some((e) => e.trackId === objTrack.trackId)
            }
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
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  onInpuntChanger: PropTypes.func,
  localStorageData: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
