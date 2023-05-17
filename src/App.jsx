import { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";
import axios from "axios";
import Header from "./Header";

const defaultCurrencies = ["UAH", "USD", "EUR"];

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [rates, setRates] = useState([]);
  useEffect(() => {
    axios
      .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((res) => setRates(res.data))
      .catch((error) => console.warn(error));
  }, []);

  const [filteredRates, setFilteredRates] = useState([]);
  useEffect(() => {
    const filter = rates.filter((rate) => defaultCurrencies.includes(rate.cc));
    setFilteredRates(filter);
  }, [rates]);

  useEffect(() => {
    const fromRates = filteredRates.find((rate) => rate.cc === fromCurrency);
    const toRates = filteredRates.find((rate) => rate.cc === toCurrency);

    setFromRate(fromRates);
    setToRate(toRates);
  }, [filteredRates, fromCurrency, toCurrency]);

  const [fromPrice, setFromPrice] = useState(0);
  const [FromRate, setFromRate] = useState(0);
  const [toRate, setToRate] = useState();
  useEffect(() => {
    const fromRates = rates.find((rate) => rate.cc === fromCurrency);
    setFromRate(fromRates);

    const toRates = rates.find((rate) => rate.cc === toCurrency);
    setToRate(toRates);
  }, [fromCurrency, toCurrency]);

  const onChangeFromPrice = (value) => {
    if (fromCurrency === "UAH") {
      if (toCurrency === "UAH") {
        setToPrice(value);
        setFromPrice(value);
      } else {
        const res = value * toRate.rate;
        setToPrice(res);
        setFromPrice(value);
      }
    } else {
      const res = value * toRate.rate;
      setToPrice(res);
      setFromPrice(value);
    }
  };

  const [toPrice, setToPrice] = useState(0);

  const onChangeToPrice = (value) => {
    if (toCurrency === "UAH") {
      setToPrice(value);
      if (fromCurrency === "UAH") {
        setToPrice(value);
        setFromPrice(value);
      } else {
        const res = value * toRate.rate;
        setToPrice(value);
        setFromPrice(res);
      }
    } else {
      const res = value * toRate.rate;
      setToPrice(value);
      setFromPrice(res);
    }
  };

  return (
    <>
      <Header filteredRates={filteredRates} />
      <div className="App">
        <Block
          defaultCurrencies={defaultCurrencies}
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          defaultCurrencies={defaultCurrencies}
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
    </>
  );
}

export default App;
