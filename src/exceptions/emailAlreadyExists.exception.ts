import httpException from './http.exception';

class EmailAlreadyExistsException extends httpException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export default EmailAlreadyExistsException;
