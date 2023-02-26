import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum PatchStatus {
  ACCEPTED,
  REJECTED,
  NOTAPPLICABLE
}

export type PatchData = {
  op:string,
  path:string,
  //TODO
  value:any,
} 

export type Patch = {
  data:PatchData,
  status: PatchStatus
}

export type PatchState = {
  patches: Patch[]
}

const initialState: PatchState = {
  patches: []
}

export const patchSlice = createSlice({
  name: 'patches',
  initialState,
  reducers: {
    savePatches: (state, action: PayloadAction<Patch[]>) => {
      state.patches = action.payload;
    },
    setStatus:(state, action: PayloadAction<{index:number, status:PatchStatus}>) => {
      state.patches[action.payload.index].status = action.payload.status;
    }
  }
});

export const { savePatches,setStatus } = patchSlice.actions;
export default patchSlice.reducer

