import React from "react";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../../n1-main/m2-bll/reducers/login-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate} from 'react-router-dom'
import {PROFILE} from "../../../n1-main/m1-ui/routing/Routing";
import {FormControl, FormGroup, FormLabel, Grid, Paper, TextField} from "@mui/material";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormikValuesType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const validate = (values: FormikValuesType) => {
        const errors: FormikErrorType = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Must be mo then 8 symbols';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values) as any)
        },
    });
    if (isLoggedIn) {
        return <Navigate to={PROFILE}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <Paper>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel style={{textAlign: "center"}}>
                            <h3>Sign in</h3>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="email"
                                helperText={formik.errors.email}
                                variant="standard"
                                type="text"
                                error={formik.touched.email && !!formik.errors.email}
                                {...formik.getFieldProps('email')}
                            />
                            <TextField
                                label="password"
                                helperText={formik.errors.password}
                                variant="standard"
                                type="password"
                                error={formik.touched.password && !!formik.errors.password}
                                {...formik.getFieldProps('password')}
                            />
                            <input id="rememberMe"
                                   type='checkbox'
                                   checked={formik.values.rememberMe}
                                   {...formik.getFieldProps('rememberMe')}/>
                            {formik.touched.password && formik.errors.password ?
                                <div>{formik.errors.password}</div> : null}
                            <button type="submit">Submit</button>
                        </FormGroup>
                    </FormControl>
                </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;