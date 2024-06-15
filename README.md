# Printer server for Epson TM-T20X

## Instalar
```bash
npm install
```

## Configuration
O arquivo `.env` deve ter as seguintes variáveis:
```dosini
vendorId=1208
productId=3623
```
Na pasta `node_modules` editar as linhas:
- escpos-usb/index.js
```diff
- let usb = require('usb');
+ let { usb, findByIds } = require('usb');

- let device = usb.findByIds(vendorId, productId);
+ let device = findByIds(vendorId, productId);
```

## Para executar
### Linux
```bash
sudo npm start
```
### Windows (precisa abrir o cmd como admin)
```bash
npm start
```