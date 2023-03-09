import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { Backdrop, ModalWindow } from './ImageModal.styled';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export const ImageModal = ({ image, imageTag, closeModal }) => {
  function useEscapeKey(closeModal) {
    const handleEscKey = useCallback(
      event => {
        if (event.key === KEY_NAME_ESC) {
          closeModal();
        }
      },
      [closeModal]
    );

    useEffect(() => {
      document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

      return () => {
        document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
      };
    }, [handleEscKey]);
  }

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
