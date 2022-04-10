const { join } = require('path');
require('dotenv').config();
const fs = require('fs');
const { IMGEXTS, VIDEOEXTS, PDFEXTS } = require('../constants/fileExt');
const interactFiles = {
  checkDoubleFile: async () => {
    // const prevFolder = join(__dirname, '../', `xlsxFiles/`);
    // const desFolder = join(__dirname, '../', `xlsxFiles/loginBackUp/`);
    // // , nextFolder
    // await fs.readdir(prevFolder, (err, files) => {
    //   files.forEach((file) => {
    //     if (file.endsWith('.xlsx')) {
    //       const newName = `${dayjs().format('MM_DD_mm_HH')}_${file}`;
    //       // File destination.txt will be created or overwritten by default.
    //       try {
    //         fs.copyFile(
    //           `${prevFolder}/${file}`,
    //           `${desFolder}/${newName}`,
    //           (err) => {
    //             if (err) throw err;
    //             // console.log('copied');
    //           }
    //         );
    //       } catch (error) {
    //         console.log('🚀 ~ error', error);
    //       }
    //     } else {
    //       return;
    //     }
    //   });
    // });
    console.log('check double');
  },
  classifyAndSaveFileFn: async (file) => {
    let uploadPath;
    const typeOfFile = file.mimetype.split('/')[0];
    const ext = file.name.split('.').pop();

    if (typeOfFile === 'image' && IMGEXTS.includes(ext)) {
      // ====
      uploadPath = join(
        __dirname,
        '../',
        'images/' + file.name.replace(/\s/g, '').toLowerCase()
      );
      file.mv(uploadPath, function (err) {
        if (err) {
          let result = {
            error: err,
            fileName: file.name,
            newFileName: file.name.replace(/\s/g, '').toLowerCase(),
          };
          return result;
        }
      });
      let result = {
        mess: 'Upload file successfully',
        fileName: file.name,
        newFileName: file.name.replace(/\s/g, '').toLowerCase(),
      };
      return result;
      // ====
    } else if (typeOfFile === 'video' && VIDEOEXTS.includes(ext)) {
      uploadPath = join(
        __dirname,
        '../',
        'videos/' + file.name.replace(/\s/g, '').toLowerCase()
      );

      file.mv(uploadPath, function (err) {
        if (err) {
          let result = {
            error: err,
            fileName: file.name,
            newFileName: file.name.replace(/\s/g, '').toLowerCase(),
          };
          return result;
        }
      });
      let result = {
        mess: 'Upload files successfully',
        fileName: file.name,
        newFileName: file.name.replace(/\s/g, '').toLowerCase(),
      };
      return result;
    } else if (typeOfFile === 'application' && PDFEXTS.includes(ext)) {
      uploadPath = join(
        __dirname,
        '../',
        'pdfs/' + file.name.replace(/\s/g, '').toLowerCase()
      );

      file.mv(uploadPath, function (err) {
        if (err) {
          let result = {
            error: err,
            fileName: file.name,
            newFileName: file.name.replace(/\s/g, '').toLowerCase(),
          };
          return result;
        }
      });
      let result = {
        mess: 'Upload file successfully',
        fileName: file.name,
        newFileName: file.name.replace(/\s/g, '').toLowerCase(),
      };
      return result;
    } else {
      return (error = `File type not supported ${file.name}`);
    }
  },
};
module.exports = interactFiles;
