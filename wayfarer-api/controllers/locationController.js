const db = require('../models')

const index = (req,res) => {
  db.Location.find(
    {},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
}

const show = (req,res) => {
  db.Location.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
}

const create = (req,res) => {
  objData = req.body
  db.Location.create(
    objData,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
    res.json(obj)
  })
}

const update = (req,res) => {
  const updateObj = req.body

  db.Location.findByIdAndUpdate(
    req.params.id,
    updateObj,
    {new: true},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);
      }
      res.json(obj)
    }
  )
}

const getPosts = (req,res) =>{
  db.Location.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
  })
    .then((obj)=>{
    db.Post.find(
      {
      _id: obj.posts
      },
      (err, obj) => {
        if (err) {
          console.log('Error:');
          console.log(err);}
        res.json(obj)
      })
    })
}

const destroy = (req, res) => {
  db.Location.findByIdAndDelete(req.params.id, (err, deleteLocation) => {
    if (err) return console.log(err);

    res.json(deleteLocation);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  getPosts,
  destroy
}