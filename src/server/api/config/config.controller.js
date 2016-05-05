import { createHttpError } from '../../utils';
import configLoader from '../../config';

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
}

export default Controller;
