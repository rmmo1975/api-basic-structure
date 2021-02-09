interface MailerTransporterAuth {
  user: string;
  password: string;
}

interface MailerTransporter {
  host: string;
  port: number;
  secure: boolean;
  auth: MailerTransporterAuth;
}

export default MailerTransporter;