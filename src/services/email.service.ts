import { createTransport, Transporter } from 'nodemailer';

import mailerTransporterInterface from '../interfaces/mailerTransporter.interface'
import emailMessageInterface from '../interfaces/emailMessage.interface';
import MailerInterface from '../interfaces/mailer.interface';

let transporter: Transporter | undefined = undefined;

const setNodeMailer = (transporterInfo: mailerTransporterInterface) => {
  transporter = createTransport(transporterInfo);
}

class Mailer implements MailerInterface {
  public async sendMail(message: emailMessageInterface): Promise<void> {

    if (!transporter)
      throw new Error('NodeMailer not initialised!');

    const info = await transporter.sendMail(message);
    console.log(`message sent: ${info.messageId}`);
  }
}

export { setNodeMailer, Mailer };