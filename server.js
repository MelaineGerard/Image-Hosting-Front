const config = require('./config.json'),
  express = require('express'),
  app = express(),
  axios = require('axios').default

app.use(express.static('public'));
app.set('view engine', 'pug')



app.get("/upload", (req, res) => {
  res.render('upload')
})

app.get('/:uuid', function (req, res) {
  let uuid = req.params.uuid
  let image
   axios.get(`${config['api']}/images/${uuid}`)
    .then(function (response) {
      if(response.data.length !== 0){
        console.log(response.data)
        res.render('image', response.data)
        return
      }
    })
    .catch(function (error) {
      console.error(error)
    })
    
    res.redirect(config['redirect_url'])
})

app.listen(config['port'], () => {
  console.log(`Server started on port ${config['port']}`)
})
