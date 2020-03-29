import { createAction, createReducer } from '@reduxjs/toolkit'
const INITIAL_STATE = []

export const addIncidents = createAction('ADD_INCIDENTS')
export const deleteIncidents = createAction('DELETE_INCIDENTS')

export default createReducer(INITIAL_STATE, {
	[addIncidents.type]: (state, action) => [ ...state, action.payload ],
	[deleteIncidents.type]: (state, action) => state.filter((item) => item.id !== action.payload)
})