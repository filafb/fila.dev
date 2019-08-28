const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4321;

const app = express();

const createApp = () => {
  //loggin middleware
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //compression middleware
  app.use(compression());

  //static middleware
  app.use('/public', express.static(path.join(__dirname, '../public')))
  app.use(express.static(path.join(__dirname, '../build')));

  //if someone enters an invalid URI, will be redirect to index.html
  //make sure it's bellow any other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  });

  //Handle 500 errors
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

async function bootApp() {
  await createApp();
  await startListening()
}
//when started from command line, it evaluates as true. If required by another module (example: tests), it evaluates false
if (require.main === module) {
  bootApp();
} else {
  createApp()
}
module.exports = app;
