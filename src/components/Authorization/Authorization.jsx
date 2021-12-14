import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { path } from 'constants/path'
import { unauthorize } from 'pages/Auth/auth.slice'
import { UserAuthenticated } from 'hooks/UseAuthenticated'
import { getCartPurchases } from 'pages/Cart/cart.slice'

export default function Authorization() {
    const status = useSelector(state => state.app.status)
    const dispatch = useDispatch()
    const history = useHistory()
    const authenticated = UserAuthenticated()

    useEffect(() => {
        if (status === 401) {
            dispatch(unauthorize())
            history.push(path.login)
        }
    }, [dispatch, status, history])

    useEffect(() => {
        if (authenticated) {
            dispatch(getCartPurchases())
        }
    }, [dispatch, authenticated])

    return null
}
