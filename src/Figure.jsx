import PropTypes from 'prop-types';

Figure.propTypes = {
  apodData: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    copyright: PropTypes.string,
    explanation: PropTypes.string,
    url: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      camera: PropTypes.shape({
        name: PropTypes.string,
      }),
      img_src: PropTypes.string,
      earth_date: PropTypes.string,
    })),
  }),
  apiSelection: PropTypes.string,
};


function Figure({ apodData, apiSelection }) {
  if (!apodData) return null;

  if (apiSelection === 'apod') {
    return (
      <div>
        <h2>{apodData.title}</h2>
        <img src={apodData.url} alt={apodData.title} />
        <p>{apodData.date}</p>
        {apodData.copyright && <p>{apodData.copyright}</p>}
        <p>{apodData.explanation}</p>
      </div>
    );
  } else if (apiSelection === 'marsRover') {
    if (apodData.photos) {
      return (
        <div>
          {apodData.photos.map((photo) => (
            <div key={photo.id}>
              <h2>{photo.camera.name}</h2>
              <img src={photo.img_src} alt='Mars Rover' />
              <p>{photo.earth_date}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <p>No photos available from Mars Rover on this Day</p>;
    }
  }

  return null;
}

export default Figure;
