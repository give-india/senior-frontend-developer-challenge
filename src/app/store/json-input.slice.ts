import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as jsonpatch from 'fast-json-patch';
import { Operation } from 'fast-json-patch';
import { PatchData } from './patch-slice';


export type JSONInputState = {
  json: any
}


const initialState: JSONInputState = {
  json: null
}

export const jsonInputSlice = createSlice({
  name: 'jsonInput',
  initialState,
  reducers: {
    saveInput: (state, action: PayloadAction<any>) => {
      console.log(action, "inside saveInput")
      state.json = action.payload;
    },
    applyPatch:(state, action:PayloadAction<Operation[]>) => {
      state.json = jsonpatch.applyPatch(state.json, action.payload).newDocument;
    }

  }
});

export const { saveInput, applyPatch } = jsonInputSlice.actions;
export default jsonInputSlice.reducer

