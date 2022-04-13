import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~store/store';
import { Provider } from 'react-redux'
import ViewEntrypoint from '~view/viewEntrypoint';

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ViewEntrypoint />
			</PersistGate>
		</Provider>
	);
};

export default App;
