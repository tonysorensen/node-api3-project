const express = require("express");
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model");
const {
  validateUserId,
  validatePost,
  validateUser,
} = require("../middleware/middleware.js");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query).then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body).then((user) => {
    res.status(201).json(user);
  });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "user removed" });
    })
    .catch((err) => console.log(err));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => console.log(err));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const newPost = { ...req.body, user_id: req.params.id };
  console.log(req.body);
  Posts.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err); res.status(500).json({ error: err });
    });
});

// do not forget to export the router

module.exports = router;
