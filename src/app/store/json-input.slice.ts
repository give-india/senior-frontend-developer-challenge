import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as jsonpatch from 'fast-json-patch';
import { Operation } from 'fast-json-patch';


export type JSONInputState = {
  currentJson: any,
  oldJson:any
}


const initialState: JSONInputState = {
  currentJson: null,
  oldJson:null
}

export const jsonInputSlice = createSlice({
  name: 'jsonInput',
  initialState,
  reducers: {
    saveInput: (state, action: PayloadAction<any>) => {
      console.log(action, "inside saveInput")
      state.currentJson = action.payload;
      state.oldJson = action.payload;
    },
    applyPatch:(state, action:PayloadAction<Operation[]>) => {
      console.log("Apply Patch slice", action.payload);
      state.currentJson = jsonpatch.applyPatch(state.currentJson, action.payload).newDocument;
    }
  }
});

export const { saveInput, applyPatch } = jsonInputSlice.actions;
export default jsonInputSlice.reducer

