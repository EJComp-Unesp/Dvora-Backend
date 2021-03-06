const { Model, DataTypes } = require('sequelize');

class Je extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      university: DataTypes.STRING,
      image: DataTypes.STRING,
      city: DataTypes.STRING,
      creationYear: DataTypes.STRING,
    },
      {
        sequelize: connection
      }
    )
  }

  static associate(models) {
    this.hasMany(models.Member, { foreignKey: 'jeId', as: 'members' });
    this.hasMany(models.Board, { foreignKey: 'jeId', as: 'boards' })
  }
}

module.exports = Je;