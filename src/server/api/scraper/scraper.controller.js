import { createHttpError } from '../../utils';
import configLoader from '../../config';
import scraper from '../../scraper';
import DoctorController from '../doctors/doctor.controller';

const doctor = new DoctorController();

class Controller {
  toggleService(req, res) {
    const status = !!scraper.toggle();
    return res.status(200).json({ status });
  }

  scrape(req, res) {
    return doctor.scrape(req, res);
  }

}

export default Controller;
