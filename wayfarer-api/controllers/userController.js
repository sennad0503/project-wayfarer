const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require('../models')

const show = (req,res) => {
	if (!req.session.currentUser) {
		return res.json({message:'Not logged in'});
	}

	// db.User.findById(req.params.id)
	db.User.findById(req.session.currentUser._id)
		.exec((err, foundObj) => {
			if (err) return res.send(err);
			res.json(foundObj);
		});
};

const create = (req,res) => {
	if(!req.body.name){
		return res.json({message:'Must enter Username'});
	}
	if(!req.body.password){
		return res.json({message:'Must enter Password'});
	}
	const user = {
		name: req.body.name,
		password: req.body.password,
	};

	db.User.findOne(user, (err, foundUser) => {
		if (err) return res.send(err);

		if (!foundUser) {
			if (req.body.password === req.body.confirm) {
				bcrypt.genSalt(15, (err, salt) => {
					if (err) return res.send(err);
					bcrypt.hash(req.body.password, salt, (err, hashedObj) => {
						const newUser = {
							name: req.body.name,
							password: hashedObj,
							account: mongoose.Types.ObjectId(),
						};
						db.User.create(newUser, (err) => {
							if (err) return res.send(err);

							res.json(newUser);
						});
					});
				});
			} else {
				res.json({message:'Passwords don\'t match. Try again.'});
			}
		} else {
			res.json({message:'Username Already Taken. Try again'});
		}
	});
}

const update = (req,res) => {
	const dataObj = {
		newName: req.body.newName,
		currPassword: req.body.currPassword,
		newPassword: req.body.newPassword,
		confirm: req.body.confirm,
	};
	if (!req.body.newName) {
		return res.json(
			{message:'Username required'}
		)
	}

	if (dataObj.newPassword === dataObj.confirm) {
		db.User.findById(req.session.currentUser._id, (err, foundUser) => {
			if (err) return res.send(err);

			bcrypt.compare(
				dataObj.currPassword,
				foundUser.password,
				(err, result) => {
					if (result) {
						bcrypt.genSalt(15, (err, salt) => {
							if (err) return res.send(err);

							bcrypt.hash(dataObj.newPassword, salt, (err, hashedPassword) => {
								db.User.findByIdAndUpdate(
									req.session.currentUser._id,
									{ name: dataObj.newName, password: hashedPassword },
									{ new: true },
									(err, updatedObj) => {
										if (err) return res.send(err);
										res.json(updatedObj);
									}
								);
							});
						});
					} else {
						return res.json(
							{message:'Current password incorrect. Try again.'}
						);
					}
				}
			);
		});
	} else {
		return res.json(
			{message:'Passwords don\'t match. Try again.'}
		);
	}
};

const remove = (req,res) => {
	db.User.findById(req.session.currentUser._id, (err, foundObj) => {
		if (err) {
			console.log("Error:");
			console.log(err);
		}
		db.User.findByIdAndDelete(foundObj._id, (err, deletedObj) => {
			if (err) return res.send(err);
			db.Post.deleteMany(
				{   ownerId: req.session.currentUser._id },
				(err, deletedArr) => {
					if (err) return res.send(err);
					res.json({message:"logout"});
				}
			);
		});
	});
};

const login = (req,res) => {
	const user = { name: req.body.name };
	db.User.findOne(user, (err, foundObj) => {
		if (err) {
			return res.send(err);
		}
		if (!foundObj) {
			return res.json({message:'User info not found.'});
		}

		bcrypt.compare(req.body.password, foundObj.password, (err, result) => {
			if (err) return res.send(err);

			if (result) {
				req.session.currentUser = foundObj;
				res.json(result);
			} else {
				res.json({message:'User info not found.'});
			}
		});
	});
};

const logout = (req,res) => {
	req.session.destroy((err) => {
		if (err) return res.send(err);
		res.json({message:'logout'});
	});
};

module.exports = {
  create,
  show,
  update,
  remove,
  login,
  logout
}
