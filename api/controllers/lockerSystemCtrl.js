const db = require("../models/index");

module.exports = {
  list(req, res) {
    console.log("hi");
    return db.lockerSystem
      .findAll()
      .then((result) => res.status(200).send(result))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return db.modbus
      .findAll({
        where: { id: req.params.id },
      })
      .then((activity) => {
        if (!activity) {
          return res.status(404).send({
            message: "activity Not Found",
          });
        }
        return res.status(200).send(activity);
      })
      .catch((error) => res.status(400).send(error));
  },

  getActiveServer(req, res) {
    console.log("getting active");
    return db.modbus
      .findAll({
        where: { active: 1 },
      })
      .then((activity) => {
        if (!activity) {
          return res.status(404).send({
            message: "activity Not Found",
          });
        }
        return res.status(200).send(activity);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return db.modbus
      .create({
        ip: req.body.ip,
        port: req.body.port,
        numcards: req.body.numcards,
        active: req.body.active,
      })
      .then((results) => res.status(201).send(results))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return db.modbus
      .findByPk(req.params.id)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            message: "Modbus Server Not Found",
          });
        }
        return results
          .update({
            ip: req.body.ip,
            port: req.body.port,
            numcards: req.body.numcards,
            active: req.body.active,
          })

          .then((results) => res.status(200).send(results))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return db.modbus
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        console.log("delete successful");
        res.status(204).send({ numDeleted: result });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};
