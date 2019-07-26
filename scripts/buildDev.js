process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const configFactory = require('../config/webpack.config');
const paths = require('../config/paths');
const fs = require('fs-extra');

fs.emptyDirSync(paths.appBuild);

module.exports = () => configFactory('development');
