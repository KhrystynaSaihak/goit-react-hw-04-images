import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Backdrop, ModalWindow } from './ImageModal.styled';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keydown';

export const ImageModal = ({ image, imageTag, closeModal }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === KEY_NAME_ESC) {
        closeModal();
      }
    };
    window.addEventListener(KEY_EVENT_TYPE, onKeyDown);
    return () => {
      window.removeEventListener(KEY_EVENT_TYPE, onKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <Backdrop onClick={handleBackdropClick}>
        <ModalWindow src={image} alt={imageTag} />
      </Backdrop>
    </>
  );
};

ImageModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  imageTag: PropTypes.string.isRequired,
};
