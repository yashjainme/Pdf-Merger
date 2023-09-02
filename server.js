const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const {mergePdfs}  = require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use(express.static('public'))




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/index.html'))
})


app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send('Please upload at least two PDF files.');
    }

    console.log(req.files);
    let d = await mergePdfs(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path)
    );

    res.redirect(`https://pdf-merger-es4y.onrender.com/${d}.pdf`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


