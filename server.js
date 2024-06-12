const express = require('express');
const escpos = require('escpos');
const utils = require('./utils');
require('dotenv').config();

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  optionsSuccessStatus: 200,
};

const app = express();
const port = 3000;

app.use(express.json(), cors(corsOptions));

app.post('/print', (req, res) => {
  const text = req.body;

  if (!text) {
    return res.status(400).send('Text is required');
  }

  escpos.USB = require('escpos-usb');

  const idVendor = parseInt(process.env.vendorId);
  const idProduct = parseInt(process.env.productId);

  const device = new escpos.USB(idVendor, idProduct);
  const printer = new escpos.Printer(device);

  const data = utils.parsedData(text[0]);
  if (!data) {
    return res.status(400).send('Dados inválidos');
  }

  device.open(() => {
    printer
      .encode('ISO-8859-1')
      .align('ct')
      .font('A')
      .text('Recibo do Associado')
      .style('B')
      .text(data.name)
      .newLine()
      .newLine()
      .style('NORMAL')
      .tableCustom(utils.table('Parcela', data.parcel))
      .tableCustom(utils.table('Status', data.status))
      .tableCustom(utils.table('Valor', data.value))
      .tableCustom(utils.table('Data de Vencimento', utils.dateFormat(data.due_date)))
      .newLine()
      .newLine()
      .text('______________________________________________')
      .text('Assinatura do Associado')
      .newLine()
      .cut()
      .close();
  });

  res.send('Enviado impressão');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
