const Je = require('../models/Je');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    // const allJe = await Je.findAll();
    // if (allJe.length == 0)
    //   return res.status(404).json({ msg: 'NOT FOUND' });
    // else
    //   return res.json(allJe);
    try {
      const allJe = await Je.findAll();
      if (allJe.length == 0)
        return res.status(200).json({ msg: 'NOT FOUND' });
      else
        return res.status(200).json(allJe);
    } catch (error) {
      return res.status(400).json({ msg: 'ERROR' });
    }
  },

  async store(req, res) {
    let { name, email, password, university, image, creationYear } = req.body;
    const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

    password = generateHash(password);

    try {
      const je = await Je.create({ name, email, password, university, image, creationYear });
      return res.status(200).json(je);
    } catch (je) {
      return res.status(400).json({ msg: 'Erro nos dados inseridos' })
    }
  },

  async login(req, res) {
    let { email, password } = req.body;
    const validPassword = (password, hash) => bcrypt.compareSync(password, hash);
    try {
      const je = await Je.findOne({
        where: { email },
      })
      if (je.length == 0)
        return res.status(200).json({ msg: 'EMAIL NOT FOUND' });
      let ok = validPassword(password, je.password);
      if (ok)
        return res.status(200).json({ msg: 'ok' });
      else
        return res.status(200).json({ msg: 'Incorrect Password' });
    } catch (error) {
      return res.status(400).json({ msg: 'ERROR' });
    }
  },

};