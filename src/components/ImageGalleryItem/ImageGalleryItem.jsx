import PropTypes from 'prop-types';
import { useState } from 'react';

import { ImageModal } from 'components/ImageModal/ImageModal';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  imgData: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <ImageModal
          closeModal={closeModal}
          image={largeImageURL}
          imageTag={tags}
        />
      )}
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={openModal}
      />
    </div>
  );
};

ImageGalleryItem.propTypes = {
  imgData: PropTypes.object.isRequired,
};
