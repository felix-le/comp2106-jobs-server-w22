const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

// GET: /api/employers => fetch all employer documents
router.get('/', (req, res) => {
  // use Mongoose model to fetch and return all employers
  Employer.find((err, employers) => {
    if (err) {
      return res.json(err).status(400); // 400: Bad Request
    } else {
      return res.json(employers).status(200); // 200: OK
    }
  });
});

// POST: /api/employers => receive form post with new employer data
// router.post('/create', (req, res) => {
//   // use mongoose to try to create new document from the request body
//   Employer.create(req.body, (err, employer) => {
//     if (err) {
//       return res.json(err).status(400);
//     } else {
//       return res.json(employer).status(201); // 201: Resource Created
//     }
//   });
// });

// DELETE: /api/employers/abc123 => delete document with id from url param
router.delete('/:_id', (req, res) => {
  Employer.remove({ _id: req.params._id }, (err, employer) => {
    if (err) {
      return res.json(err).status(400);
    } else {
      return res.json(employer).status(204); // 204: No Content
    }
  });
});

// PUT: /api/employers/abc123 => update document with id from url param
router.put('/:_id', (req, res) => {
  Employer.findOneAndUpdate(
    { _id: req.params._id },
    req.body,
    (err, employer) => {
      if (err) {
        return res.json(err).status(400);
      } else {
        return res.json(employer).status(202); // 202: Accepted
      }
    }
  );
});

module.exports = router;
