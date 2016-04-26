import { Doctor } from '../../database';

class Controller {
  all(req, res) {
    Doctor()
      .findAll()
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(500).json(err));
  }

  create(req, res) {
    const newDoctor = {
      siteId: req.body.siteId,
      url: req.body.url
    };
    console.log(`Creating doctor with site id of ${newDoctor.siteId}`);

    Doctor()
      .create(newDoctor)
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(500).json(err));
  }

  destroy(req, res) {
    const id = req.params.id;
    console.log(`Deleting doctor with id of ${id}`);
    Doctor()
      .findById(id)
      .then((doctor) => doctor.destroy({ cascade: true }))
      .then((rowsDeleted) => res.status(200).json(rowsDeleted))
      .catch((err) => res.status(500).json(err));
  }

  show(req, res) {
    Doctor()
      .findById(req.params.id)
      .then((doctor) => res.status(200).json(doctor))
      .catch((err) => res.status(404).json(err));
  }
}

export default Controller;
