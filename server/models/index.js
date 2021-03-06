'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
//var env       = process.env.NODE_ENV || 'development';
//var config    = require(path.join(__dirname, 'configSeq.json')) [env];
var config = require('config');

var dbUser = config.get('caregen.dbConfig.username');
var dbName = config.get('caregen.dbConfig.database');
var dbPass = config.get('caregen.dbConfig.password');
var dbConfig =   config.get('caregen.dbConfig');

var db        = {};

var sequelize = new Sequelize(dbName, dbUser, dbPass, dbConfig);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
