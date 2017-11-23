var convict = require('convict');

var config = convict({
    env: {
      doc: "The application environment.",
      format: ["production", "development", "test"],
      default: "development",
      env: "NODE_ENV"
    },
});
var env = config.get('env');
config.loadFile('./config/' + env + '.json');
config.validate();
module.exports = config;