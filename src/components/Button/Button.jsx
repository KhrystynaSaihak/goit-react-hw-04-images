import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.syled';

export const Button = ({ handleMoreImage }) => {
  return (
    <ButtonStyled type="button" onClick={handleMoreImage}>
      Load more
    </ButtonStyled>
  );
};

Button.propTypes = {
  handleMoreImage: PropTypes.func.isRequired,
};
