import PropTypes from 'prop-types';

export default function ImageGalleryItem({  onClick, webformatURL, tags }) {
console.log(webformatURL)
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
  // webformatURL: PropTypes.string.isRequired,
   tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
