import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'preact';
import { App } from './app.jsx'

import './styles/index.css'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('app')).render(
 <React.StrictMode>
    <App/>
 </React.StrictMode>
)

