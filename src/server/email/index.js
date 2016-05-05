import Config from '../config';
import EmailClient from './client';
import logger from '../logger';
const log = logger.create('Email');

function getClient() {
  return Config.all()
    .then((config) => Object.create({ config, client: new EmailClient(config.email) }));
}

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
  const onSuccess = (recpient, body) => {
    log.verbose(`[${doctor.name}] new review email to [${recpient}]`)
      .debug('Body:', body);
    successCount++;
  };

  return getClient().then(({ config, client }) => {
    log.debug(`Building message for ${doctor.name}`);
    if (doctor.emailDefaultUser) {
      addresses.push(config.defaultRecipient);
    }
    return client.build(config.email).then((builtMail) => {
      log.debug(`Sending [${doctor.name}] to [${addresses.length}] addresses`);
      for (const address of addresses) {
        const mail = Object.assign(builtMail, { to: address });
        this.send(mail).then((body) => onSuccess(address, body));
      }
      return successCount;
    })
    .catch((err) => {
      log.error('Error sending new review alert', err);
      throw err;
    });
  });
}

export function testEmail(recpient) {
  return getClient().then(({ config, client }) => {
    const options = {
      to: recpient || config.email.defaultRecipient,
      from: `Test message <noreply@${config.email.domain}>`,
      subject: 'Test email',
      html: '<b>This is test HTML!</b>'
    };
    log.verbose('Sending test message').debug('Options:', options);
    return client.buildAndSend(options);
  });
}

export default { sendNewReview, testEmail, Client: EmailClient };
