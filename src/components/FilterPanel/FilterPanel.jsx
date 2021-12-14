import RatingStars from 'components/RatingStars/RatingStars'
import { path } from 'constants/path'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import { FilterGroup } from './StylesFilterPanel'
import { PriceRange } from './StylesFilterPanel'
import { PriceRangeLine } from './StylesFilterPanel'
import { PriceRangeButton } from './StylesFilterPanel'
import { RemoveFilterButton } from './StylesFilterPanel'
import { PriceErrorMessage } from './StylesFilterPanel'
import { PriceRangeInput } from './StylesFilterPanel'
import { PriceRangeGroup } from './StylesFilterPanel'
import { FilterGroupHeader } from './StylesFilterPanel'
import { CategoryTitle } from './StylesFilterPanel'
import { CategoryItem } from './StylesFilterPanel'
import { CategoryList } from './StylesFilterPanel'
import { CategoryTitleLink } from './StylesFilterPanel'
import qs from 'query-string'
import useQuery from 'hooks/useQuery'
import { filter } from 'lodash'
import IconMenuCategories from 'assets/img/IconMenuCategories'
import IconFindSearch from 'assets/img/IconFindSearch'
export default function FilterPanel({ categories, filters }) {
    console.log('filtersxxx', filters)
    const history = useHistory()
    // const query = useQuery()
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        clearErrors,
        reset,
        setValue
    } = useForm({
        defaultValues: {
            minPrice: filters.minPrice || '',
            maxPrice: filters.maxPrice || ''
        },
        reValidateMode: 'onSubmit'
    })

    useEffect(() => {
        setValue('minPrice', filters.minPrice || '')
        setValue('maxPrice', filters.maxPrice || '')
    }, [setValue, filters])

    const validPrice = () => {
        const minPrice = getValues('minPrice') 
        const maxPrice = getValues('maxPrice')
        const message = 'Vui lòng điền khoảng giá phù hợp'

        if (minPrice !== '' && maxPrice !== '') {
            return Number(maxPrice) >= Number(minPrice) || message
        }
        return minPrice !== '' || maxPrice !== '' || message
    }

    const clearAll = () => {
        reset()
        history.push({
            pathname: path.home
        })
    }

    const searchPrice = data => {
        const { minPrice, maxPrice } = data
        if (minPrice !== '' || maxPrice !== '') {
            let _filters = filters
            if (minPrice !== '') {
                _filters = { ..._filters, minPrice }
            } else {
                delete _filters.minPrice
            }
            if (maxPrice !== '') {
                _filters = { ..._filters, maxPrice }
            } else {
                delete _filters.maxPrice
            }
            history.push(path.home + `?${qs.stringify(_filters)}`)
        }
        console.log('qs.stringify(filters)', qs.stringify(filters))
        console.log('minPrice', minPrice)
    }

    return (
        <div>
            <i className="bx bx-menu" />
            <CategoryTitleLink to={path.home}>
                <IconMenuCategories />
                Tất cả danh mục
            </CategoryTitleLink>
            <CategoryList>
                {categories.map(item => (
                    <CategoryItem key={item._id}>
                        <NavLink
                            to={path.home + `?category=${item._id}`}
                            isActive={(match, location) => {
                                //match này chỉ có khi mà nó trúng cái route của nó
                                // console.log(match)
                                // console.log(location)
                                if (!match) {
                                    return false
                                }
                                const query = qs.parse(location.search)
                                return query.category === item._id
                            }}
                        >
                            {item.name}
                        </NavLink>
                    </CategoryItem>
                ))}
            </CategoryList>
            <CategoryTitle>
                <IconFindSearch />
                Bộ lọc tìm kiếm
            </CategoryTitle>

            <FilterGroup>
                <FilterGroupHeader>Khoản giá</FilterGroupHeader>
                <PriceRange>
                    <PriceRangeGroup>
                        <Controller
                            name="minPrice"
                            control={control}
                            rules={{
                                // rules này sẽ xác nhận xem validate được trả về cái gì
                                validate: { validPrice }
                            }}
                            // render này sẽ xuất ra component mà ta muốn trong Controller
                            render={({ field }) => (
                                <PriceRangeInput
                                    placeholder="Từ"
                                    onChange={value => {
                                        clearErrors() // clearErrors nghĩa là nó sẽ xóa lỗi(errors) của react-hook-form thôi nhé mỗi khi ta nhập thêm giá trị, phần này thằng này chỉ hơi sơ sài, nên tự tư duy làm thêm
                                        field.onChange(value)
                                    }}
                                    value={getValues('minPrice')}
                                />
                            )}
                        />
                        <PriceRangeLine />
                        <Controller
                            name="maxPrice"
                            control={control}
                            rules={{
                                validate: { validPrice }
                            }}
                            render={({ field }) => (
                                <PriceRangeInput
                                    placeholder="Đến"
                                    onChange={value => {
                                        clearErrors()
                                        field.onChange(value)
                                    }}
                                    value={getValues('maxPrice')}
                                />
                            )}
                        />
                    </PriceRangeGroup>
                    {Object.values(errors).length !== 0 && (
                        // báo lỗi khi có lỗi
                        <PriceErrorMessage>Vui lòng điền khoảng giá phù hợp</PriceErrorMessage>
                    )}
                    <PriceRangeButton onClick={handleSubmit(searchPrice)}>Áp dụng</PriceRangeButton>
                </PriceRange>
            </FilterGroup>
            <FilterGroup>
                <FilterGroupHeader>Đánh giá</FilterGroupHeader>
                <RatingStars filters={filters} />
            </FilterGroup>
            <RemoveFilterButton onChange={clearAll}>Xóa tất cả</RemoveFilterButton>
        </div>
    )
}
FilterPanel.prototype = {
    categories: PropTypes.array.isRequired,
    filters: PropTypes.object
}
