import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export type JSONInputState = {
  json: string | null,
}


const initialState: JSONInputState = {
  json: null
}

export const jsonInputSlice = createSlice({
  name: 'jsonInput',
  initialState,
  reducers: {
    saveInput: (state, action: PayloadAction<JSONInputState>) => {
      console.log(action, "inside saveInput")
      state.json = action.payload.json;
    },

  }
});

export const { saveInput } = jsonInputSlice.actions;
export default jsonInputSlice.reducer

