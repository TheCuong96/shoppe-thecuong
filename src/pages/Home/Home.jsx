import { unwrapResult } from '@reduxjs/toolkit'
import FilterPanel from 'components/FilterPanel/FilterPanel'
import SearchItemResult from 'components/SearchItemResult/SearchItemResult'
import useQuery from 'hooks/useQuery'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCategories, getProducts } from './home.slice'
import { Main } from './StylesHome'
import { Side } from './StylesHome'
import { Container } from './StylesHome'

export default function Home() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState({
        products: [],
        pagination: {}
    })
    const [filters, setFilters] = useState({})
    const dispatch = useDispatch()

    const query = useQuery()

    useEffect(() => {
        dispatch(getCategories())
            .then(unwrapResult)
            .then(res => {
                setCategories(res.data)
                console.log('res', res)
            })
    }, [dispatch])

    useEffect(() => {
        const _filters = {
            ...query,
            page: query.page || 1, 
            limit: query.limit || 30, 
            sortBy: query.sortBy || 'view'
        }
        setFilters(_filters)
        const params = {
            page: _filters.page,
            limit: _filters.limit,
            category: _filters.category,
            exclude: _filters.exclude,
            rating_filter: _filters.rating,
            price_max: _filters.maxPrice,
            price_min: _filters.minPrice,
            sort_by: _filters.sortBy,
            order: _filters.order,
            name: _filters.name
        }
        const _getProducts = async () => {
            const data = await dispatch(getProducts({ params }))
            const res = unwrapResult(data)
            setProducts(res.data)
        }
        _getProducts()
    }, [query, dispatch])


    return (
        <Container className="container">
            <Side>
                <FilterPanel categories={categories} filters={filters} />
            </Side>
            <Main>
                <SearchItemResult products={products} filters={filters} />
            </Main>
        </Container>
    )
}
