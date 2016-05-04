import Mailgun from 'mailgun-js';
import mailComposer from 'mailcomposer';

export class EmailClient {
  constructor({ apiKey, domain, from }) {
    this.mailgun = new Mailgun({ apiKey, domain });
    this.from = from;
  }

  /**
   * Build a message object
   *
   * options: {
   *  from:     string (optional, will be pulled from config)
   *  to:       string
   *  subject:  string
   *  body:     string (optional)
   *  html:     string (optional)
   * }
   * Either body or html is required
   *
   * @param object  options           Message contents
   * @param boolean sendImmediately   Send the built mail right away (requires options.to)
   */
  build(options, sendImmediately = false) {
    return new Promise((resolve, reject) => {
      if (!options.from) {
        options.from = this.from;
      }

      mailComposer(options).build((err, message) => {
        if (err) {
          throw err;
        }
        const builtMail = { to: options.to, message, built: true };
        if (sendImmediately) {
          if (!builtMail.to) {
            throw new Error('No recipient was provided');
          }
          return this.send(builtMail);
        }
        return resolve(builtMail);
      });
    });
  }

  /**
   * Send an email
   * Can be called by using {@link build} or passing a custom object.
   *
   * custom = {
   *  from:     string (optional, will be pulled from config)
   *  to:       string
   *  subject:  string
   *  text:     string
   * }
   *
   * @param object mail Either built mail or custom object
   */
  send(mail = false) {
    return new Promise((resolve, reject) => {
      // Validate mail object
      if (!mail) {
        throw new Error('Mail object was not defined');
      } else if (!mail.to) {
        throw new Error('No recipient was provided');
      }

      // Validate built or custom mail object
      if (mail.built && !mail.message) {
        throw new Error('No message was provided');
      } else {
        if (!mail.subject) {
          throw new Error('No subject was provided');
        } else if (!mail.text) {
          throw new Error('No message was provided');
        }
      }

      const callback = (err, body) => {
        if (err) {
          console.error('Send error', err);
          throw err;
        }
        // Emit that email sent successfully?
        return resolve(true, body);
      };

      // Send the email
      if (mail.built) {
        const mimeMail = Object.assign(mail, { message: mail.message.toString('ascii') });
        this.mailgun.messages().sendMime(mimeMail, callback);
      } else {
        this.mailgun.messages().send(mail, callback);
      }
    });
  }
}

export default EmailClient;
