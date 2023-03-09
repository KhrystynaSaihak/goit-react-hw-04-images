import PropTypes from 'prop-types';
import { Component } from 'react';
import { Backdrop, ModalWindow } from './ImageModal.styled';

export class ImageModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    imageTag: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image, imageTag } = this.props;
    return (
      <>
        <Backdrop onClick={this.handleBackdropClick}>
          <ModalWindow src={image} alt={imageTag} />
        </Backdrop>
      </>
    );
  }
}
