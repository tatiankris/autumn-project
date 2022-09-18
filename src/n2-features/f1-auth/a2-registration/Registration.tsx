import React from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, IconButton, Input, InputAdornment, InputLabel,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Field, Form, Formik, FormikErrors, FormikHelpers, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate, NavLink} from "react-router-dom";
import {LOGIN} from "../../../n1-main/m1-ui/routing/Routing";
import {registrationTC} from "../../../n1-main/m2-bll/reducers/registration-reducer";
import s from './Registration.module.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {Visibility, VisibilityOff} from "@mui/icons-material";


export type ValuesType = {
    email: string;
    password: string;
    confirmPassword: string;
}
type FormikErrorType   = {
    email?: string;
    password?: string;
    confirmPassword?: string;
}



const Registration = () => {

    const dispatch = useDispatch<any>();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: (values: ValuesType) => {
            let errors: FormikErrors<FormikErrorType> = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password || values.password.length === 0) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = "Зassword cannot be less than 8 characters...";
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match...';
            }

            return errors;
        },

        onSubmit: values => {
            formik.resetForm();
            dispatch(registrationTC(values));
        },
    });

    const signUp = useSelector<AppRootStateType>(state => state.registration.signUp);
    if (signUp) {
        return <Navigate to={LOGIN}/>
    }

    return (
        <div>
            <Toolbar className={s.toolbar}>
                <Typography variant="h6" style={{padding: '6px'}}>
                    Friday Project
                </Typography>
                <Button className={s.button} variant="contained">
                    <NavLink to={LOGIN}>Log In</NavLink>
                </Button>
            </Toolbar>
        <Grid className={s.form} container justifyContent={'center'} bgcolor={'#ebedf0'}>
            <Grid style={{padding: "40px"}} item justifyContent={'center'} bgcolor={'white'} minWidth={"400px"}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl text-align={'center'}>
                        <FormLabel>
                            <h1>Sign Up</h1>
                        </FormLabel>
                        <FormGroup>
                            <TextField variant={'filled'} fullWidth label="Email"
                                       margin="normal" {...formik.getFieldProps("email")}
                                       error={formik.touched.email && formik.errors.email ? true : false}
                                       helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            />
                            <TextField variant={'filled'} fullWidth type="password" label="Password"
                                       margin="normal" {...formik.getFieldProps("password")}
                                       error={formik.touched.password && formik.errors.password ? true : false}
                                       helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                            />
                            <TextField variant={'filled'} fullWidth type="password" label="Confirm password"
                                       margin="normal" {...formik.getFieldProps("confirmPassword")}
                                       error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                                       helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''}
                            />
                            {JSON.stringify(formik.errors).length === 2 ?
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Sign Up
                                </Button> : <Button disabled type={'submit'} variant={'contained'} color={'primary'}>
                                    Sign Up
                                </Button>}

                        </FormGroup>
                        <FormLabel>
                            <p>Already have an account?</p>
                            <NavLink to={LOGIN}>Sign In</NavLink>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
        </div>
    )
}

export default Registration;
