const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const kullanicilar = sequelize.define('kullanicilar', {
  kullanici_ad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  kullanici_sifre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'kullanicilar',
  timestamps: false,
});

module.exports = kullanicilar;
