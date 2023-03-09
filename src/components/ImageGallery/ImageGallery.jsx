import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  ImageGalleryStuled,
  ImageGalleryItemStyled,
} from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryStuled>
      {images.map(img => {
        return (
          <ImageGalleryItemStyled key={img.id}>
            <ImageGalleryItem imgData={img}></ImageGalleryItem>
          </ImageGalleryItemStyled>
        );
      })}
    </ImageGalleryStuled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
