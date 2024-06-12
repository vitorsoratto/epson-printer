# Printer server for Epson TM-T20X

## Installation
```bash
npm install
```

## Configuration
Create a `.env` file with the following content:
```dosini
vendorId=printerVendorId
productId=printerProductId
```
In node_modules, edit:
- escpos-usb/index.js
```diff
- let usb = require('usb');
+ let { usb } = require('usb');
```

## Usage
```bash
nodemon server.js
```