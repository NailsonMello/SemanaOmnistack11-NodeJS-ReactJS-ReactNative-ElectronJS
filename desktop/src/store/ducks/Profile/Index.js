import { createAction, createReducer } from '@reduxjs/toolkit'
const INITIAL_STATE = []

export const getIncidentsOng = createAction('FETCH_INCIDENTS')

export default createReducer(INITIAL_STATE, {
	[getIncidentsOng.type]: (state, action) => [ ...action.payload ]
})