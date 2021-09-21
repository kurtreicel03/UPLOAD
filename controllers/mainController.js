const fs = require('fs');
const path = require('path');

const pool = require('../database');

exports.mainPage = async (req, res) => {
  try {
    await pool.getConnection((err, con) => {
      if (err) throw err;

      con.query('SELECT * FROM user', (err, results, fields) => {
        con.release();
        if (err) throw err;
        const { alert } = req.query;
        res.render('index', { results, alert });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadPage = (req, res) => {
  try {
    res.render('upload', { id: req.params.id });
  } catch (error) {
    res.render('404', { response: error.message });
  }
};

exports.uploadFile = (req, res) => {
  try {
    if (!req.files) {
      res.render('404', { response: 'No file to upload!' });
    }

    const { upload } = req.files;
    const uploadPath = path.join(__dirname, `../public/img/${upload.name}`);
    const fileType = upload.mimetype.split('/')[1];

    if (fileType !== 'jpeg' && fileType !== 'jpg' && fileType !== 'png') {
      throw new Error('unsupported file type please upload JPG/JPEG/PNG file');
    }

    pool.getConnection((err, con) => {
      if (err) throw err;
      con.query('UPDATE user SET photo = ? WHERE id = ?', [upload.name, req.params.id], (err, results) => {
        con.release();

        if (err) throw err;

        upload.mv(uploadPath, err => {
          if (err) throw err;
        });
        const successQuery = encodeURIComponent('Profile updated successfully');
        res.redirect(`/?alert=${successQuery}`);
      });
    });
  } catch (error) {
    console.log(error);
    res.render('404', { response: 'Oops something went wrong uploading tour file! ' });
  }
};
