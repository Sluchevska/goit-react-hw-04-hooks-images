import PropTypes from 'prop-types';

export default function ImageGalleryItem({ onClick,  webformatURL, tags }) {
  
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
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tags:PropTypes.string
};
