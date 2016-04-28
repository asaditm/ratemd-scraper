import scraper from '../../scraper';
import { Doctor, Review } from '../../database';
import { extractId } from '../../scraper/scraper';

function notFound(res) {
  return res.status(404).json('Doctor not found');
}

function errorHandler(err, res) {
  console.error('ErrorHandler: ', err);
  return res.status(500).json(err);
}

class Controller {
  all(req, res) {
    Doctor()
      .findAll({ include: [{ model: Review() }] })
      .then((docs) => res.status(200).json(docs))
      .catch((err) => errorHandler(err, res));
  }

  create(req, res) {
    const newDoctor = {
      siteId: req.body.siteId,
      url: req.body.url,
      emailList: JSON.stringify(req.body.emailList)
    };

    // Make sure id field isn't null
    if (newDoctor.url) {
      newDoctor.siteId = extractId(newDoctor.url);
    }

    console.log(`Creating doctor with site id of ${newDoctor.siteId}`);
    Doctor()
      .create(newDoctor)
      .then((value) => res.status(200).json(value))
      .catch((err) => errorHandler(err, res));
  }

  update(req, res) {
    Doctor().findById(req.params.id)
      .then((doctor) => {
        if (!doctor) {
          return notFound(res);
        }
        const updated = Object.assign(req.body, {
          emailList: JSON.stringify(req.body.emailList)
        });
        return doctor.update(updated)
          .then((result) => res.status(200).json(result));
      })
      .catch((err) => errorHandler(err, res));
  }

  destroy(req, res) {
    const id = req.params.id;
    console.log(`Deleting doctor with id of ${id}`);
    Doctor()
      .destroy({ where: { id } })
      .then((rowsDeleted) => res.status(200).json(rowsDeleted))
      .catch((err) => errorHandler(err, res));
  }

  show(req, res) {
    Doctor()
      .findById(req.params.id, { include: [{ model: Review() }] })
      .then((doctor) => {
        if (!doctor) {
          return notFound(res);
        }
        return res.status(200).json(doctor);
      }).catch((err) => errorHandler(err, res));
  }

  scrape(req, res) {
    Doctor()
      .findById(req.params.id)
      .then((doctor) => {
        if (!doctor) {
          return notFound(res);
        }
        console.log(`Forcing scrape of ${doctor.name}`);
        scraper.single(doctor);
        return res.status(200).json('Scraping has been triggered');
      }).catch((err) => errorHandler(err, res));
  }
}

export default Controller;
