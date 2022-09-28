const doInsert = (model, callback) => {
  model.save((err, result) => {
    if (err) {
      console.log("err: ", err);
      callback(err, result);
    } else {
      console.log("result: ", result);
      callback(null, result);
    }
  });
};

const doExec = (model, callback) => {
  model.exec((err, result) => {
    if (err) {
      console.log("err: ", err);
      callback(err, result);
    } else {
      console.log("result: ", result);
      callback(null, result);
    }
  });
};

const findOne = (model, project, callback) => {
  model.find();
};

module.exports = { doInsert, doExec };
