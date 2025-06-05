import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { CurrentOrg } from '../type'

const orgConfigSlice = createSlice({
  name: 'orgDefault',
  initialState: defaultValue.orgDefault,
  reducers: {
    setOrgConfig(state, action: PayloadAction<CurrentOrg>) {
      state.id = action.payload.id
      state.name = action.payload.name
    },
  },
})

const { actions, reducer } = orgConfigSlice
export const { setOrgConfig } = actions
export default reducer
