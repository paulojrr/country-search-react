import React, { useState, useEffect } from 'react';

import GlobalStyles from './Components/GlobalStyles';
import * as Header from './Components/Header';
import Countries from './Components/Countries';

function App() {
  const [allCountries, setAllCountries] = useState('');
  const [countries, setCountries] = useState('');
  const [filtered, setFiltered] = useState(allCountries);
  const [totalPopulation, setTotalPopulation] = useState('');
  const [filteredPopulation, setFilteredPopulation] = useState('');

  // Busca os dados na API
  useEffect(() => {
    async function handleFetch(url) {
      const response = await fetch(url);
      const json = await response.json();
      setAllCountries(json);
    }
    handleFetch(`https://restcountries.eu/rest/v2/all`);
  }, []);

  // População total dos países
  var total = 0;
  useEffect(() => {
    if (allCountries !== '') {
      total = allCountries.reduce((accumulator, current) => {
        return accumulator + current.population;
      }, 0);
    }
    setTotalPopulation(total);
  }, [allCountries]);

  // População total dos países filtrados
  var totalFiltered = 0;
  useEffect(() => {
    if (filtered !== '') {
      totalFiltered = filtered.reduce((accumulator, current) => {
        return accumulator + current.population;
      }, 0);
    }
    setFilteredPopulation(totalFiltered);
  }, [filtered]);

  // Formata os números da população
  const formatter = Intl.NumberFormat('pt-BR');

  // Ativa quando algo é digitado
  function handleInput(e) {
    setCountries(handleSearch(e.target.value));
  }

  // Realiza a busca dos países
  function handleSearch(value) {
    // Armazena os países filtrados
    const filteredCountries = [];

    // Se o valor do input for igual a 0
    // limpa a busca
    if (value.length === 0) {
      return setFiltered(allCountries);
    }

    // Percorre os países os filtrando com base
    // no input
    for (let i = 0; i < allCountries.length; i++) {
      const newValue = value.toLowerCase();

      const country = allCountries[i].name.toLowerCase();

      if (country.includes(newValue)) {
        filteredCountries.push(allCountries[i]);

        setFiltered(filteredCountries);
      }
    }
  }

  return (
    <>
      <GlobalStyles />

      <Header.Content>
        <Header.SearchInput
          placeholder={'Digite o nome do país'}
          onChange={handleInput}
        />
        <Header.Info>
          Países: {filtered ? filtered.length : allCountries.length}
        </Header.Info>
        <Header.Info>
          População Total:{' '}
          {filtered
            ? formatter.format(filteredPopulation)
            : formatter.format(totalPopulation)}
        </Header.Info>
      </Header.Content>

      <Header.Title>Países</Header.Title>

      <Countries countries={filtered ? filtered : allCountries} />
    </>
  );
}
export default App;
