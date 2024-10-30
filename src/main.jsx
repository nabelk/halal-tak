import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { inject } from '@vercel/analytics';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import Error500 from './components/500.jsx';

inject();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={(props) => <Error500 isRouter={false} {...props} />}>
            <App />
        </ErrorBoundary>
    </StrictMode>,
);
