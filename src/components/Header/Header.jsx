import IconCart from 'assets/img/IconCart'
import IconSearch from 'assets/img/IconSearch'
import IconShopeeSearch from 'assets/img/IconShopeeSearch'
import Navbar from 'components/Navbar/Navbar'
import Popover from 'components/Popover/Popover'
import { path } from '../../constants/path'
import useQuery from 'hooks/useQuery'
import UserPopover from 'hooks/UserPopover'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Cart } from './StylesHeader'
import { PopoverTitle } from './StylesHeader'
import { MiniProductCartImg } from './StylesHeader'
import { MiniProductCartPrice } from './StylesHeader'
import { MoreProduct } from './StylesHeader'
import { ButtonShowCart } from './StylesHeader'
import { PopoverFooter } from './StylesHeader'
import { MiniProductCartTitle } from './StylesHeader'
import { MiniProductCart } from './StylesHeader'
import { CartNumberBadge } from './StylesHeader'
import { CartIcon } from './StylesHeader'
import { CartContainer } from './StylesHeader'
import { SearchButton } from './StylesHeader'
import { SearchInput } from './StylesHeader'
import { Logo } from './StylesHeader'
import { Form } from './StylesHeader'
import { SearchWraped } from './StylesHeader'
import { HeaderWrapper } from './StylesHeader'
import { formatMoney } from 'utils/helper'

export default function Header() {
    const { activePopover, hidePopover, showPopover } = UserPopover()
    const [searchValue, setSearchValue] = useState('')
    const history = useHistory()
    const query = useQuery()
    const purchases = useSelector(state => state.cart.purchases)

    useEffect(() => {
        const { name = '' } = query
        setSearchValue(name)
        console.log('query===========', query)
    }, [query])

    const onChangeSearch = event => {
        setSearchValue(event.target.value)
    }

    const search = event => {
        event.preventDefault()
        history.push(path.home + `?name=${searchValue}`)
        console.log('history===========', history)
    }

    return (
        <HeaderWrapper>
            <Navbar />
            <SearchWraped>
                <Logo to="/">
                    <IconShopeeSearch />
                </Logo>
                <Form onSubmit={search}>
                    <SearchInput placeholder="Tìm kiếm sản phẩm" value={searchValue} onChange={onChangeSearch} />
                    <SearchButton type="submit">
                        <IconSearch />
                    </SearchButton>
                </Form>
                <Cart onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                    <CartContainer>
                        <CartIcon to="">
                            <IconCart />
                            {purchases.length > 0 && <CartNumberBadge>{purchases.length}</CartNumberBadge>}
                        </CartIcon>
                        <Popover active={activePopover}>
                            <PopoverTitle>Sản phẩm mới thêm</PopoverTitle>
                            {purchases.slice(0, 5).map(purchases => (
                                <MiniProductCart key={purchases._id}>
                                    <MiniProductCartImg src={purchases.product.image} />
                                    <MiniProductCartTitle>{purchases.product.name}</MiniProductCartTitle>
                                    <MiniProductCartPrice>đ{formatMoney(purchases.product.price)}</MiniProductCartPrice>
                                </MiniProductCart>
                            ))}

                            <PopoverFooter>
                                <MoreProduct>
                                    {purchases.length > 5 && <span>{purchases.length - 5} sản phẩm vào giỏ</span>}
                                </MoreProduct>
                                <ButtonShowCart to={path.cart}>Xem giỏ hàng</ButtonShowCart>
                            </PopoverFooter>
                        </Popover>
                    </CartContainer>
                </Cart>
            </SearchWraped>
        </HeaderWrapper>
    )
}
