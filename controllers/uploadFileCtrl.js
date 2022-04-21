const interactFileExist = require('../helper/interactFileExist');
const { join } = require('path');
const { isArray } = require('lodash');
const uploadFileCtrl = {
  uploadFileFn: async (req, res) => {
    if (!req.files) {
      console.log('no file');
      return res.status(400).json({ msg: 'No file uploaded' });
    } else {
      const isSingleFile = !isArray(req.files.files);
      if (isSingleFile) {
        let file = req.files.files;

        const result = await interactFileExist.classifyAndSaveFileFn(file);

        if (!result.error) {
          return res.json(result);
        } else {
          return res.status(400).json({ msg: result.error });
        }
      } else {
        let fileArr = req.files.files;

        let resultArr = [];
        for (let i = 0; i < fileArr.length; i++) {
          let file = fileArr[i];
          const result = await interactFileExist.classifyAndSaveFileFn(file);
          if (!result.error) {
            // return res.json(result);
            resultArr.push(result);
          } else {
            // return res.status(400).json({ msg: result.error });
            resultArr.push({ msg: result.error });
          }
        }
        return res.json(resultArr);
      }
    }
  },
};

module.exports = uploadFileCtrl;
