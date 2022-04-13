import { createRoot } from 'react-dom/client';

import App from '~app/App';

import {
	registerServiceWorker,
	unregisterServiceWorker,
} from './serviceWorkerRegistration.js';

import './i18n';
import './index.scss';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);

const enableServiceWorkerStandCondition = process.env.APP_STAND !== 'local';
const enableServiceWorkerDefaultValue = 'false';
const enableServiceWorkerValue =
	process.env.APP_ENABLE_SERVICE_WORKER || enableServiceWorkerDefaultValue;
const shouldInstallServiceWorker =
	JSON.parse(enableServiceWorkerValue) && enableServiceWorkerStandCondition;

root.render(
		<App />
);

if (shouldInstallServiceWorker) {
	registerServiceWorker();
}

if (!shouldInstallServiceWorker) {
	unregisterServiceWorker();
}
