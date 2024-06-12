const express = require('express');
const escpos = require('escpos');
const env = require('dotenv').config();

const app = express();
const port = 3000;

// Configure middleware to parse JSON
app.use(express.json());

// Route to handle print requests
app.post('/print', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Text is required');
  }

  // Set up the printer
  escpos.USB = require('escpos-usb');

  const idVendor = parseInt(process.env.vendorId);
  const idProduct = parseInt(process.env.productId);
  console.log(idVendor, idProduct);

  const device = new escpos.USB(idVendor, idProduct);
  const printer = new escpos.Printer(device);

  device.open(() => {
    printer
      .text(text, 'shift_jis')
      .text('mãoáàãâäåæçèéêëìíîïðñòóôõöøùúûüýþÿ', 'utf8')
      .text('mãoáàãâäåæçèéêëìíîïðñòóôõöøùúûüýþÿ', 'utf-8')
      .text('mãoáàãâäåæçèéêëìíîïðñòóôõöøùúûüýþÿ', 'win1252')
      .cut()
      .close();
  });

  res.send('Print job sent');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
