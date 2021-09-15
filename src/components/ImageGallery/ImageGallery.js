import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, onSelect }) => {
  return (
    <ul className="ImageGallery">
      {pictures.map((picture, id) => (
        <ImageGalleryItem
          key={id}
          image={picture}
          onClick={() => onSelect(picture)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      pictures: PropTypes.object,
      id: PropTypes.number.isRequired,
    }),
  ),
  onSelect: PropTypes.func.isRequired,
};
