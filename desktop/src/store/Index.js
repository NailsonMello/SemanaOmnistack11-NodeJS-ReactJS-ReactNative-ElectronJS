import { configureStore } from '@reduxjs/toolkit'
import authReducer from './ducks/Logon/Index'
import incidentsReducer from './ducks/NewIncidents/Index'
import profileReducer from './ducks/Profile/Index'
import registerReducer from './ducks/Register/Index'

export default configureStore({
	reducer: {
		auth: authReducer,
		incidents: incidentsReducer,
		profile: profileReducer,
		register: registerReducer
	}
});