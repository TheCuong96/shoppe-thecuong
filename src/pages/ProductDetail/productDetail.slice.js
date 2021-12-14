import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from 'api/product.api'
import purchaseApi from 'api/purchase.api'
// import { payloadCreator } from 'src/utils/helper'
import { payloadCreator } from '../../utils/helper'
export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail',
    payloadCreator(productApi.getProductsDetail)
)

export const addToCart = createAsyncThunk('productDetail/addToCart', payloadCreator(purchaseApi.addToCart))
