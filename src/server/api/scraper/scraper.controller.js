import { createHttpError } from '../../utils';
import configLoader from '../../config';
import scraper from '../../scraper';
import DoctorController from '../doctors/doctor.controller';

const doctor = new DoctorController();
const userConfig = new configLoader.User();

class Controller {
  toggleService(req, res) {
    const enabled = !!scraper.toggle();
    userConfig.update({ scraper: { enabled } })
      .then(() => res.status(200).json({ enabled }))
      .catch((err) =>
        res.status(500).json(createHttpError('Error toggling scraper', err))
      );
  }

  scrape(req, res) {
    return doctor.scrape(req, res);
  }

}

export default Controller;
