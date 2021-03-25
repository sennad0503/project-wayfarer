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
  objData = {
    ...(req.body),
    ownerId: req.session.currentUser._id
  }

  db.Post.create(
    objData,
    (err, postObj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}  
      db.Location.findById(
        postObj.location,
        (err, locationObj) => {
          if (err) {
            console.log('Error:');
            console.log(err);}
        locationObj.posts.push(postObj._id)
          const updateObj = locationObj
          db.Location.findByIdAndUpdate(
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
        db.Location.findById(
          postObj.location,
          (err, obj) => {
            if (err) {
              console.log('Error:');
              console.log(err);}
        }).then(locationObj=>{
              const newPosts=locationObj.posts.filter(post =>  post+'' !== postObj.id+'')
              const updateObj = {
                posts: newPosts
              }
              db.Location.findByIdAndUpdate(
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

const clear = (req,res) => {
  db.Post.deleteMany(
    {},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);
      }
      res.json(obj)
    })
}

const getPosts = (req,res) =>{
  db.Post.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
  })
    .then((obj)=>{
    db.Post.find(
      {
      _id: obj.location
      },
      (err, obj) => {
        if (err) {
          console.log('Error:');
          console.log(err);}
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
  clear,
  getPosts
}
