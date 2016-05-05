import Config from './config';
import EmailClient from './client';

/**
 * options: {
 *  from:     string (optional, will be pulled from config)
 *  to:       string
 *  subject:  string
 *  body:     string (optional)
 *  html:     string (optional)
 * }
 */
export function sendNewReview(doctor) {
  const addresses = [].concat(doctor.emailList);

  let successCount = 0;
  const onSuccess = (success) => successCount++;

  return Config.all().then((config) => {
    const emailClient = new EmailClient(config.email);
    return emailClient.build(config.email).then((builtMail) => {
      for (const address of addresses) {
        const mail = Object.assign(builtMail, { to: address });
        this.send(mail).then(onSuccess);
      }
      return successCount;
    })
    .catch((err) => {
      console.error('Error sending new review alert', err);
      throw err; // TODO remove?
    });
  });
}

export default {
  sendNewReview
};
