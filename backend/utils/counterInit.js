const Counter = require('../models/Counter');

// Creates counter for model if counter not exist
function findCounterForModel(id) {
  return new Promise((resolve, reject) => {
    Counter.findById(id, (err, doc) => {
      if (!doc) {
        const newCounter = new Counter({ _id: id });
        newCounter.save(err => {
          if (err) {
            reject(new Error(err));
          }
        });
        console.log('findCounterForModel newCounter', newCounter);
        resolve(newCounter);
        return newCounter;
      }
      console.log('findCounterForModel doc', doc);
      resolve(doc);
      return doc;
    });
  });
}

exports.findCounterForModel = findCounterForModel;
