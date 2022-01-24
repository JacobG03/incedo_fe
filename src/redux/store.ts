import { configureStore } from '@reduxjs/toolkit'

import meReducer from './slices/meSlice'
import themeReducer from './slices/themeSlice'
import alertsReducer from './slices/alertsSlice'


export default configureStore({
	reducer: {
		me: meReducer,
		theme: themeReducer,
		alerts: alertsReducer
	}
})
