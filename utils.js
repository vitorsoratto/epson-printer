var utils = {
  dateFormat: function (date) {
    let d = new Date(date).toLocaleDateString('pt-BR');
    return d;
  },
  table: function (label, data) {
    return [
      {
        text: label,
        align: 'LEFT',
      },
      {
        text: data,
        align: 'RIGHT',
      },
    ];
  },
  parsedData: function (data) {
    if (
      !data.hasOwnProperty('name') ||
      !data.hasOwnProperty('parcel') ||
      !data.hasOwnProperty('value') ||
      !data.hasOwnProperty('due_date') ||
      !data.hasOwnProperty('status')
    ) {
      return null;
    }

    let v = parseValue(data.value);

    return {
      name: data.name ?? '',
      parcel: data.parcel ?? '',
      value: v,
      due_date: data.due_date ?? '',
      status: parseStatus(data.status),
    };
  },
};

var parseValue = function (value) {
  value = isNullOrEmpty(value) ? '0' : value;
  if (value) {
    let v = parseFloat(value);
    return v.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '');
  }
};

var isNullOrEmpty = function (value) {
  return value == null || value === '';
};

var parseStatus = function (status) {
    if (status == '' || status == null || status == 'A') {
        return 'Aberto';
    } else if (status == 'P') {
        return 'Paga';
    }
};

module.exports = utils;
