// USD CAD 23 -> Canadian equivilant of $23
// 23 USD is worth convertedValue CAD. You can spend these in the following countries: listingOfCountries

// http://api.fixer.io/latest?base=USD

// https://restcountries.eu/rest/v2/currency/cop


const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`)
    .then((response) => {
      return response.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then((response) => {
      return response.data.map((country) => {
        return country.name;
      });
    })
    .catch((e) => {
      console.log('Error in getCountries with argument:', currencyCode);
      return 'Error in getCountries: ' + currencyCode;
    });
};

const convertCurrency = (from, to, amount) => {
  if (from === to) { // handle edge case
    return new Promise((resolve, reject) => {
      resolve(`${amount} ${from} is worth ${amount} ${to}.`);
    });
  }

  let countries;

  return getCountries(to)
    .then((tempCountries) => {
      countries = tempCountries;
      return getExchangeRate(from, to);
    })
    .then((rate) => {
      const exchangedAmount = amount * rate;

      return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countrie(s): ${countries.join(', ')}`;
    })
    .catch((e) => {
      console.log('Error in getCountries with argument:', to);
      return 'Error in convertCurrency: ' + to;
    })
};

convertCurrency('USD', 'CAD', 23).then((conversion) => {
  console.log(conversion);
});

