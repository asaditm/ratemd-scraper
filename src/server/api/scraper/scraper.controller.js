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

  scrapeAll(req, res) {
    userConfig.read().then(config => {
      scraper.all();
      return res.status(200).json({ message: 'Scraping all doctors' });
    }).catch((err) =>
      res.status(500).json(createHttpError('Error toggling scraper', err))
    );
  }

}

export default Controller;
