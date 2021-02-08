import httpException from './http.exception';

class WrongCredentialsException extends httpException {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}

export default WrongCredentialsException;
