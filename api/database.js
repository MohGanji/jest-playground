/* eslint-disable no-console */

import mongoose from 'mongoose';

export default conf => {
  mongoose.Promise = global.Promise;
  mongoose.connect(conf);
  mongoose.connection
    .once('open', () => console.log('Mongo running'))
    .on('error', err => { throw err; });
}
