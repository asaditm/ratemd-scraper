import { createHttpError } from '../../utils';
import configLoader from '../../config';
import email from '../../email';
import { Doctor, Review } from '../../database';

function notFound(res) {
  return res.status(404).json('Doctor not found');
}

function errorHandler(err, res) {
  return res.status(500).json(err);
}

class Controller {
  retrieve(req, res) {
    configLoader.all().then((config) => {
      if (!config) {
        return res.status(500).json(createHttpError('Unable to load config', config));
      }
      return res.status(200).json({ status: 200, config });
    });
  }

  update(req, res) {
    const userConfig = new configLoader.User();
    userConfig.update(req.body).then((err) => {
      if (err) {
        return res.status(500).json(createHttpError('Unable to save config', req.body));
      }
      return res.sendStatus(200);
    });
  }

  emailTest(req, res) {
    const recipient = req.body.recipient;
    email.testEmail(recipient).then((body) => {
      console.log('inside', body);
      return res.status(200).json({ body, message: 'Test email successful' });
    }).catch((err) => errorHandler(err, res));
  }

  emailReview(req, res) {
    Doctor()
      .findById(req.params.id, { include: [{ model: Review() }] })
      .then((doctor) => {
        if (!doctor) {
          return notFound(res);
        }
        return email.sendNewReview(doctor).then((sentCount) => {
          if (sentCount === 0) {
            return res.status(500).json({ status: 'error', message: 'No emails were sent' });
          }
          return res.status(200).json({
            status: 'success',
            message: `[${sentCount}] emails were sent`,
            count: sentCount
          });
        });
      }).catch((err) => errorHandler(err, res));
  }
}

export default Controller;
