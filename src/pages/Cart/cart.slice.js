import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseApi from 'api/purchase.api'
import { logout } from 'pages/Auth/auth.slice'
import { payloadCreator } from 'utils/helper'

export const getCartPurchases = createAsyncThunk('cart/getCartPurchases', payloadCreator(purchaseApi.getCartPurchases))

export const updatePurchase = createAsyncThunk('cart/updatePurchase', payloadCreator(purchaseApi.updatePurchases))

export const deletePurchases = createAsyncThunk('cart/deletePurchases', payloadCreator(purchaseApi.deletePurchases))

export const buyPurchases = createAsyncThunk('cart/buyPurchases', payloadCreator(purchaseApi.buyPurchases))

const cart = createSlice({
    name: 'cart',
    initialState: {
        purchases: []
    },
    extraReducers: {
        [getCartPurchases.fulfilled]: (state, action) => {
            state.purchases = action.payload.data
        },
        [logout.fulfilled]: state => {
            state.purchases = []
            // khi logout được fulfilled, nghĩa là nó đã được hoàn thành xong, thì làm sạch giá trị trong purchases
        }
    }
})

const cartReducer = cart.reducer
export default cartReducer
