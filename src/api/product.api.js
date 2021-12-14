import http from 'utils/http'

const URL = 'products'
const productApi = {
    getProducts(config) {
        return http.get(URL, config)
    },
    getProductsDetail(id) {
        return http.get(`${URL}/${id}`)
    }
}

export default productApi
