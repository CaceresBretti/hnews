const jsonfile = require('jsonfile');
const path     = require('path');

let config = {
    getParam: function(param){ 
        return jsonfile.readFileSync(this.getConfigFile())[param];
    },

    getConfigFile: function(file_path) {
        file_path = file_path === undefined ? path.join(__dirname, './config.json') : file_path;
        return file_path;
    },

    getAppDir: function() {
        return path.join(__dirname, '');
    }
};

module.exports = config;