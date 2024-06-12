# Printer server for Epson TM-T20X

## Installation
```bash
npm install
```

## Configuration
Create a `.env` file with the following content:
```dosini
vendorId=1208
productId=3623
```
In node_modules, edit:
- escpos-usb/index.js
```diff
- let usb = require('usb');
+ let { usb, findByIds } = require('usb');

- let device = usb.findByIds(vendorId, productId);
+ let device = findByIds(vendorId, productId);
```

## Usage
### Linux
```bash
sudo npm start
```
### Windows (needs admin rights)
```bash
npm start
```