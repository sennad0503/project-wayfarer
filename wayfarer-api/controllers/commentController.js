const db = require('../models');

const index = (req,res) => {
  db.Post.find(
    {},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
}

const create = (req,res) => {
  objData = req.body

  db.Post.create(
    objData,
    (err, postObj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}  
      db.Post.findById(
        postObj.location,
        (err, locationObj) => {
          if (err) {
            console.log('Error:');
            console.log(err);}
        locationObj.location.push(postObj._id)
          const updateObj = locationObj
          db.Post.findByIdAndUpdate(
            locationObj._id,
            updateObj,
            {new: true},
            (err, obj) => {
              if (err) {
                console.log('Error:');
                console.log(err);
              }
              res.json(postObj)
            }
          )
        })
    })
    
}

const show = (req,res) => {
  db.Post.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
  
}

const update = (req,res) => {

    const updateObj = req.body
  
    db.Post.findByIdAndUpdate(
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

const remove = (req,res) => {
    db.Post.findById(
      req.params.id,
      (err, obj) => {
        if (err) {
          console.log('Error:');
          console.log(err);
        }
      }).then(postObj=>{
        db.Post.findById(
          postObj.location,
          (err, obj) => {
            if (err) {
              console.log('Error:');
              console.log(err);}
        }).then(locationObj=>{
              const newPosts=locationObj.location.filter(post =>  post+'' !== postObj.id+'')
              const updateObj = {
                location: newPosts
              }
              db.Post.findByIdAndUpdate(
                locationObj._id,
                updateObj,
                {new: true},
                (err, obj) => {
                  if (err) {
                    console.log('Error:');
                    console.log(err);
                  }
                }
              )
          })
      }).then(()=>{
          db.Post.findByIdAndDelete(
            req.params.id,
            (err, obj) => {
              if (err) {
                console.log('Error:');
                console.log(err);
              }
              res.json(obj)
            })
      })
    
}


module.exports = {
  index,
  create,
  show,
  update,
  remove,
}
