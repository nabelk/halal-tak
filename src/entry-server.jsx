import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export const render = ({ path }) => {
    return ReactDOMServer.renderToString(
        <StrictMode>
            <StaticRouter location={path}>
                <App />
            </StaticRouter>
        </StrictMode>,
    );
};
