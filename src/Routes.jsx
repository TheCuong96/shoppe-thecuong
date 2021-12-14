import React, { lazy, Suspense } from 'react'
import { path } from 'constants/path'
import { Route, Switch } from 'react-router-dom'
import MainLayout from 'layouts/MainLayout/MainLayout'
import UnauthenticatedGuards from 'guards/UnauthenticatedGuards'
import AuthenticatedGuards from 'guards/AuthenticatedGuards'
import CartLayout from 'layouts/CartLayout/CartLayout'
import RegisterLayout from 'layouts/RegisterLayout/RegisterLayout'
import Loading from 'components/Loading/Loading'

const Home = lazy(() => import('./pages/Home/Home'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const User = lazy(() => import('./pages/User/User'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Register = lazy(() => import('./pages/Auth/Register/Register'))
const Login = lazy(() => import('./pages/Auth/Login/Login'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

export default function Routes() {
    return (
        <Switch>

            <Route path={path.login}>
                <UnauthenticatedGuards>
                    <RegisterLayout title="Đăng nhập">
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    </RegisterLayout>
                </UnauthenticatedGuards>
            </Route>
            <Route path={path.register}>
                <UnauthenticatedGuards>
                    <RegisterLayout title="Đăng Ký">
                        <Suspense fallback={<Loading />}>
                            <Register />
                        </Suspense>
                    </RegisterLayout>
                </UnauthenticatedGuards>
            </Route>
            <Route path={path.home} exact>
                <MainLayout>
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                </MainLayout>
            </Route>
            <Route path={path.productDetail} exact>
                <MainLayout>
                    <Suspense fallback={<Loading />}>
                        <ProductDetail />
                    </Suspense>
                </MainLayout>
            </Route>
            <Route path={path.user}>
                <AuthenticatedGuards>
                    <MainLayout>
                        <Suspense fallback={<Loading />}>
                            <User />
                        </Suspense>
                    </MainLayout>
                </AuthenticatedGuards>
            </Route>
            <Route path={path.cart}>
                <AuthenticatedGuards>
                    <CartLayout>
                        <Suspense fallback={<Loading />}>
                            <Cart />
                        </Suspense>
                    </CartLayout>
                </AuthenticatedGuards>
            </Route>
            <Route path={path.notFound}>
                <Suspense fallback={<Loading />}>
                    <NotFound />
                </Suspense>
            </Route>
        </Switch>
    )
}
