import ReactDOM from 'react-dom/client';
import { render } from 'preact';
import { App } from './app.jsx'

import './styles/index.css'
import './styles/fonts.css'

render(<App />, document.getElementById('app'))
