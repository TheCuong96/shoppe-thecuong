import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/auth.api'
import userApi from 'api/user.api'
import LocaStorage from 'constants/localStorage'
import { payloadCreator } from 'utils/helper'



export const register = createAsyncThunk('auth/register', payloadCreator(authApi.register))

export const login = createAsyncThunk('auth/login', payloadCreator(authApi.login))

export const logout = createAsyncThunk('auth/logout', payloadCreator(authApi.logout))

export const updateMe = createAsyncThunk('auth/updateMe', payloadCreator(userApi.updateMe))

const handleAuthFulfilled = (state, action) => {
    const { user, access_token } = action.payload.data
    state.profile = user
    localStorage.setItem(LocaStorage.user, JSON.stringify(state.profile))
    localStorage.setItem(LocaStorage.accessToken, access_token)
}
const handleUnauth = state => {
    state.profile = {}
    localStorage.removeItem(LocaStorage.user)
    localStorage.removeItem(LocaStorage.accessToken)
}
const auth = createSlice({
    name: 'auth',
    initialState: { profile: JSON.parse(localStorage.getItem(LocaStorage.user)) || {} },
    reducers: {
        unauthorize: handleUnauth
    },
    extraReducers: {
        [register.fulfilled]: handleAuthFulfilled,
        [login.fulfilled]: handleAuthFulfilled,
        [logout.fulfilled]: handleUnauth,
        [updateMe.fulfilled]: (state, action) => {
            state.profile = action.payload.data
            localStorage.setItem(LocaStorage.user, JSON.stringify(state.profile))
        }
    }
})


const authReducer = auth.reducer
export const unauthorize = auth.actions.unauthorize
export default authReducer
