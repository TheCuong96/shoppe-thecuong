import { purchaseStatus } from 'constants/status'
import http from 'utils/http'
// Đây là nơi setup api để mua hàng
const URL = 'purchases'
const purchaseApi = {
    addToCart(data) {
        return http.post(`${URL}/add-to-cart`, data)
    },
    getCartPurchases(data) {
        return http.get(URL, {
            params: {
                status: purchaseStatus.inCart
            }
        })
    },
    getPurchases(status) {
        //lấy tổng sản phẩm đang có trong giỏ hàng của use hiện tại
        return http.get(URL, {
            params: {
                status
            }
        })
    },
    updatePurchases(data) {
        //api chỉnh sửa số lượng sản phẩm
        return http.put(`${URL}/update-purchases`, data)
    },
    deletePurchases(data) {
        // api xóa sản phẩm đã chọn trong giỏ hàng
        return http.delete(`${URL}`, data)
    },
    buyPurchases(data) {
        // api mua sản phẩm
        return http.post(`${URL}/buy-products`, data)
    }
}



export default purchaseApi
