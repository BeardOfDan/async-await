const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => {
      return country.name;
    });
  } catch (e) {
    throw new Error(`Unable to get countries that use the currency '${currencyCode}'`);
  }
};

const convertCurrency = (from, to, amount) => {
  if (from === to) { // handle edge case
    return new Promise((resolve, reject) => {
      resolve(`Have a think about what you just did and then try something else.`);
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
    });
};

// Create convertCurrencyAlt as async function
const convertCurrencyAlt = async (from, to, amount) => {
  if (from === to) { // handle edge case
    return new Promise((resolve, reject) => {
      resolve(`Have a think about what you just did and then try something else.`);
    });
  }

  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countrie(s): ${countries.join(', ')}`;
};

convertCurrencyAlt('CAD', 'USD', 100).then((conversion) => {
  console.log(conversion);
})
  .catch((e) => {
    console.log(e.message);
  });

