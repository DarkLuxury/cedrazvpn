module.exports = {
  async index(req, res) {
    var fs = require('fs')

      function createJSON(object, fileName) {

      fs.writeFile(`./tests/${fileName}`, `${object}`, function(err) {
          if(err) {
              console.log(err)
          } else {
              console.log("O arquivo foi salvo!")
          }
      }); 
      }

      function deleteJSON(json) {
          fs.unlink(`./tests/${json}`, (err) => {
              if (err) throw err;
              console.log(`${json} foi deletado.`);
          })
      }

      var Client = require('ssh2').Client;
      var login = 'teste815'
      var password = `${Math.floor(Math.random() * (9))}` + `${Math.floor(Math.random() * (9))}` + `${Math.floor(Math.random() * (9))}` + `${Math.floor(Math.random() * (9))}`
      var tempo = '30'
      var json = `${login}` + '.json'

      function verificaExiste() {
          while (fs.existsSync(`./tests/${json}`) == true) {
              login = 'teste' + `${Math.floor(Math.random() * (9))}` + `${Math.floor(Math.random() * (9))}` + `${Math.floor(Math.random() * (9))}`
              json = `${login}` + '.json'
              console.log('Esse teste já existe')
          }
      }

      verificaExiste()
      createJSON(`{ "login": "${login}", "password": "${password}" }`, json)

      var conn = new Client();
      conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('./criarusuario.sh ' + login + ' ' + password + ' 1 1', () => {})
        setTimeout(() => {
          conn.exec('./remover.sh ' + login, () => {})
          deleteJSON(json)
          console.log('Tempo expirado.')
        }, tempo * 1000)
        conn.exec('nano ./usuarios.db', () => {})
      }).connect({
        host: '18.229.252.158',
        port: 22,
        username: 'root',
        password: '080802'
      })
      
  return res.json({ "login": login, "password": password }).send()
  
  }
}