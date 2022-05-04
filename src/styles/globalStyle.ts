import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};

    html, body, #root {
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    a, a:hover, a:active, a:visited {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
