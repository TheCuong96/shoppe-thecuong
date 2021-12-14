import { useSelector } from 'react-redux'

export function UserAuthenticated() {
    const haha = useSelector(state => state.auth)
    return useSelector(state => Boolean(state.auth.profile._id))
}
