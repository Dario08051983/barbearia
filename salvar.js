const express = require('express');
const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/salvar', (req, res) => {
  const { nome, telefone, data, horario } = req.body;
  const xml = xmlbuilder.create('agendamento')
    .ele('nome', nome).up()
    .ele('telefone', telefone).up()
    .ele('data', data).up()
    .ele('horario', horario).end({ pretty: true });

  const nomeArquivo = `agendamentos/${Date.now()}-${nome.replace(/\s+/g, '-')}.xml`;

  fs.writeFile(path.join(__dirname, nomeArquivo), xml, (err) => {
    if (err) {
      console.error('Erro ao salvar XML:', err);
      return res.status(500).send('Erro');
    }
    console.log('Agendamento salvo em XML!');
    res.send('OK');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
