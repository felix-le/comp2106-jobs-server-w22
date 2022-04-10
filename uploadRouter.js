const router = require('express').Router();
const uploadFileCtrl = require('./controllers/uploadFileCtrl');
router.post('/upload', uploadFileCtrl.uploadFileFn);

module.exports = router;
