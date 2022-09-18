
import React, {useState} from "react";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../../n1-main/m2-bll/reducers/login-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate, NavLink} from 'react-router-dom'
import {PASSWORD_RECOVERY, PROFILE, REGISTRATION} from "../../../n1-main/m1-ui/routing/Routing";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikErrorType = {
    email?: string
}
type FormikValuesType = {
    email?: string
}

const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const validate = (values: FormikValuesType) => {
        const errors: FormikErrorType = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            alert(values.email)
        },
    });
    if (isLoggedIn) {
        return <Navigate to={PROFILE}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                <Paper elevation={14} style={{padding: "30px"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth>
                            <FormLabel style={{textAlign: "center"}}>
                                <h2>Forgot your password?</h2>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    helperText={formik.touched.email && !!formik.errors.email ? formik.errors.email : " "}
                                    variant="standard"
                                    type="text"
                                    error={formik.touched.email && !!formik.errors.email}
                                    {...formik.getFieldProps('email')}
                                />
                                <FormLabel>
                                    <div style={{fontSize:"13px"}}>Enter your email address and we will send you further instructions</div>
                                </FormLabel>
                                <Button style={{marginTop: "60px"}} type={'submit'} variant={'contained'} color={'primary'} fullWidth>
                                    Send instructions
                                </Button>
                            </FormGroup>
                            <FormLabel style={{textAlign: "center"}}>
                                <h6 style={{color: "gray"}}>Did you remember your password?</h6>
                                <h4><NavLink to={REGISTRATION} style={{color: 'blue'}}>Try logging in</NavLink></h4>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PasswordRecovery;

