import React from 'react'

import { unwrapResult } from '@reduxjs/toolkit'
import { Button } from 'assets/styles/StylesUtils'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import InputPassword from 'components/InputPassword/InputPassword'
import InputText from 'components/InputText/InputText'
import { path } from 'constants/path'
import { rules } from 'constants/rules'
import { Controller, useForm } from 'react-hook-form'

import { Banner } from '../Register//StylesRegister'
import { Form } from '../Register/StylesRegister'
import { FormFooter } from '../Register/StylesRegister'
import { FormButton } from '../Register/StylesRegister'
import { FormControl } from '../Register/StylesRegister'
import { FormTitle } from '../Register/StylesRegister'
import { FormWrapper } from '../Register/StylesRegister'
import { Container } from '../Register/StylesRegister'
import { RegisterWrapped } from '../Register/StylesRegister'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../auth.slice'

export default function Login() {
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        setError
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogin = async data => {
        const body = {
            email: data.email,
            password: data.password
        }
        try {
            const res = await dispatch(login(body))
            unwrapResult(res)
            history.push(path.home)
        } catch (error) {
            if (error.status === 422) {
                for (const key in error.data) {
                    setError(key, {
                        type: 'server',
                        message: error.data[key]
                    })
                }
            }
        }
    }
    return (
        <RegisterWrapped>
            <Banner />
            <Container>
                <FormWrapper>
                    <FormTitle>Đăng nhập</FormTitle>
                    <Form onSubmit={handleSubmit(handleLogin)} noValidate>
                        <FormControl>
                            <Controller
                                name="email"
                                control={control}
                                rules={rules.email}
                                render={({ field }) => (
                                    <InputText
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={field.onChange}
                                        value={getValues('email')}
                                    />
                                )}
                            />
                            <ErrorMessage errors={errors} name="email" />
                        </FormControl>
                        <FormControl>
                            <Controller
                                name="password"
                                control={control}
                                rules={rules.password}
                                render={({ field }) => (
                                    <InputPassword
                                        name="password"
                                        placeholder="password"
                                        onChange={field.onChange}
                                        value={getValues('password')}
                                    />
                                )}
                            />
                            <ErrorMessage errors={errors} name="password" />
                        </FormControl>

                        <FormButton>
                            <Button type="submit">Đăng nhập</Button>
                        </FormButton>
                    </Form>
                    <FormFooter>
                        <span>Bạn mới biết đến shopee?</span>
                        <Link to={path.register} className="link">
                            Đăng ký
                        </Link>
                    </FormFooter>
                </FormWrapper>
            </Container>
        </RegisterWrapped>
    )
}
