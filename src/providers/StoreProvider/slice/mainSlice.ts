import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MainScheme, MainType } from '../../../types/MainType'

const initialState: MainScheme = {}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    initAuthData: (state, action: PayloadAction<MainType>) => {
      state.mainInfo = action.payload
      state.offsetServerNow = Date.now() - new Date(action.payload.current_time).getTime();
    },
  },
})

export const { actions: mainActions } = mainSlice
export const { reducer: mainReducer } = mainSlice
