import { single as scrapeSingle } from '../../scraper';
import { Review } from '../../database';
import { extractId } from '../../scraper/scraper';

function notFound(res) {
  return res.status(404).json('Review not found');
}

function errorHandler(err, res) {
  console.error('ErrorHandler: ', err);
  return res.status(500).json(err);
}

class Controller {
  all(req, res) {
    Review()
      .findAll()
      .then((docs) => res.status(200).json(docs))
      .catch((err) => errorHandler(err, res));
  }

  show(req, res) {
    Review()
      .findOne({ where: { doctorId: req.params.id } })
      .then((review) => {
        if (!review) {
          return notFound(res);
        }
        return res.status(200).json(review);
      }).catch((err) => errorHandler(err, res));
  }
}

export default Controller;
