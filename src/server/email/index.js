// Here is where the individual email functions will go

// And will pass them to the email client

// ie:  on new review
// ie: forgot password
// ie: on error?

// deal with global config here, let email client be seperate.
// -> like api key, domain, default from, etc.

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
  const globalRecpient = 'jordondehoog@gmail.com'; // Grab from config object
  const addresses = [globalRecpient].concat(doctor.emailList);

  let successCount = 0;
  const onSuccess = (success) => successCount++;

  const mailOptions = {};

  return this.build(mailOptions)
    .then((builtMail) => {
      for (const address of addresses) {
        const mail = Object.assign(builtMail, { to: address });
        this.send(mail).then(onSuccess);
      }
    })
    .catch((err) => {
      console.error('Error sending new review alert', err);
      throw err; // TODO remove?
    });
}

export default {
  sendNewReview
};
