import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, onClick }) {
  const { webformatURL, tags } = image;
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        onClick={onClick}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
