
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordsSchema = new Schema({
  word: String, 
  def: String

});

mongoose.model('words', wordsSchema);

