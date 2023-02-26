import { configureStore } from '@reduxjs/toolkit'
import jsonInputReducer from './json-input.slice'
import patchSlice from './patch-slice'

export const store = configureStore({
  reducer: {
    input: jsonInputReducer,
    patch: patchSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch