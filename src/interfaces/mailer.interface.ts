import emailMessageInterface from './emailMessage.interface'

interface Mailer {
  sendMail(message: emailMessageInterface): Promise<void>;
}

export default Mailer;