import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	body {
		font-family: Arial, Helvetica, sans-serif;
		display: flex;
		justify-content: center;
		align-items: center
	}
`;

export default GlobalStyles;
