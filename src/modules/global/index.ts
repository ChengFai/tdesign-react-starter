import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { project } from 'configs';
import { checkAuth } from 'utils';
import { RootState } from '../store';

const namespace = 'global';

export interface IAuth {
  id: number;
  name: string;
  auth_key: string;
  app_id: number;
}

export interface IGlobalState {
  loading: boolean;
  auth: IAuth[];
}

const initialState: IGlobalState = {
  loading: true,
  auth: [],
};

export const fetchAuth = createAsyncThunk(`${namespace}/leahAuth`, async () => {
  let auth = [];
  if (project.leahAuth) {
    auth = (await checkAuth()) || [];
  }
  return {
    auth,
  };
});

// 创建带有命名空间的reducer
const counterSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.auth;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectGlobal = (state: RootState) => state.global;
export default counterSlice.reducer;
