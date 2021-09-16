import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ src, tags, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })
  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

   return createPortal(
      <div className="Overlay" onClick={handleBackDrop}>
        <div className="Modal">
          <img src={src} alt={tags} />
        </div>
      </div>,
      modalRoot,
    );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackDrop = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { src, alt } = this.props;
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackDrop}>
//         <div className="Modal">
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
