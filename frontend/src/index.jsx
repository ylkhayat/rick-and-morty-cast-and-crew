import React from 'react';
import { hot } from 'react-hot-loader';
import App from './pages/App';
import { createRoot } from 'react-dom/client';

const HotReloadableApp = hot(module)(App);

createRoot(document.getElementById('root')).render(<HotReloadableApp />);
