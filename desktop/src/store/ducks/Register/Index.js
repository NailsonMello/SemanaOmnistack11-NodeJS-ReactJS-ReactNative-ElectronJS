import { createAction, createReducer } from '@reduxjs/toolkit'
const INITIAL_STATE = []

export const addOng = createAction('ADD_ONG')

export default createReducer(INITIAL_STATE, {
	[addOng.type]: (state, action) => [ ...state, action.payload ]
})