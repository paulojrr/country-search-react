import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 700px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const WrapperCountry = styled.li`
  list-style: none;
  padding: 40px;
  max-width: 30px;
`;

const WrapperList = styled.ul`
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const CountryImage = styled.img`
  width: 100px;
  height: 50px;
`;

const Countries = (props) => {
  const country = Object.values(props.countries);

  return (
    <Wrapper>
      <Content>
        {country.map(({ name, numericCode, flag }) => {
          return (
            <WrapperList key={numericCode}>
              <CountryImage src={flag} />
              <WrapperCountry>{name}</WrapperCountry>
            </WrapperList>
          );
        })}
      </Content>
    </Wrapper>
  );
};

export default Countries;
