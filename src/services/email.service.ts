import { createTransport, Transporter, SentMessageInfo } from 'nodemailer';

import mailerTransporterInterface from '../interfaces/mailerTransporter.interface'
import emailMessageInterface from '../interfaces/emailMessage.interface';
import MailerInterface from '../interfaces/mailer.interface';

class Mailer implements MailerInterface {

  private transporter: Transporter;
  
  constructor(transportInfo: mailerTransporterInterface) {
    this.transporter = createTransport(transportInfo);
  }
  public async sendMail(message: emailMessageInterface): Promise<void> {
    const info = await this.transporter.sendMail(message);
    console.log(`message sent: ${info.messageId}`);
  }
}

export class MailerCreator {
  private static instance: Mailer;

  private constructor() {};

  public static getInstance(transportInfo: mailerTransporterInterface): Mailer {
    if (!MailerCreator.instance) {
        MailerCreator.instance = new Mailer(transportInfo);
    }        
    return MailerCreator.instance
}
}
