import { unwrapResult } from '@reduxjs/toolkit'
import { Button } from 'assets/styles/StylesUtils'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import InputPassword from 'components/InputPassword/InputPassword'
import InputText from 'components/InputText/InputText'
import { path } from 'constants/path'
import { rules } from 'constants/rules'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import http from 'utils/http'
import { register } from '../auth.slice'

import { Banner } from './StylesRegister'
import { Form } from './StylesRegister'
import { FormFooter } from './StylesRegister'
import { FormButton } from './StylesRegister'
import { FormControl } from './StylesRegister'
import { FormTitle } from './StylesRegister'
import { FormWrapper } from './StylesRegister'
import { Container } from './StylesRegister'
import { RegisterWrapped } from './StylesRegister'

export default function Register() {
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        setError
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmedPassword: ''
        }
    })

 

    const dispatch = useDispatch()
    const history = useHistory()
    const handleRegister = async data => {
        const body = {
            email: data.email,
            password: data.password
        }
        try {
            const res = await dispatch(register(body))
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
    
    console.log(errors)
    return (
        <RegisterWrapped>
            <Banner />
            <Container>
                <FormWrapper>
                    <FormTitle>Đăng ký</FormTitle>
                    <Form onSubmit={handleSubmit(handleRegister)} noValidate>
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
                        <FormControl>
                            <Controller
                                name="confirmedPassword"
                                control={control}
                                rules={{
                                    ...rules.confirmedPassword,
                                    validate: { samePassword: v => v === getValues('password') }
                                }}
                                render={({ field }) => (
                                    <InputPassword
                                        name="confirmedPassword"
                                        placeholder="Nhập lại mất khẩu"
                                        onChange={field.onChange}
                                        value={getValues('confirmedPassword')}
                                    />
                                )}
                            />
                            <ErrorMessage errors={errors} name="confirmedPassword" />
                        </FormControl>
                        <FormButton>
                            <Button type="submit">Đăng Ký</Button>
                        </FormButton>
                    </Form>
                    <FormFooter>
                        <span>Bạn đã có tài khoản chưa?</span>
                        <Link to={path.login} className="link">
                            Đăng nhập
                        </Link>
                    </FormFooter>
                </FormWrapper>
            </Container>
        </RegisterWrapped>
    )
}
