module.exports = function(validateArray, data) {
  return function(req,res,next) {
    var result = validateArray.every(function(key,index,array) {
      return req.body[data].hasOwnProperty(key);
    }) ? next():res.send({ success : false, message : "Please fill out all fields"});
  };
};
