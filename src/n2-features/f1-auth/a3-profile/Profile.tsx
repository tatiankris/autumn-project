import React, {useCallback, useEffect} from "react";
import SuperEditableSpan from "../../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";
import {Navigate, NavLink} from "react-router-dom";
import {changeNameTC} from "../../../n1-main/m2-bll/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {logoutTC, setProfileTC} from "../../../n1-main/m2-bll/reducers/login-reducer";
import {LOGIN} from "../../../n1-main/m1-ui/routing/Routing";
import {Button, Grid, Paper, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import s from './Profile.module.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Profile = React.memo(() => {
    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.profile.name);
    const avatar = useAppSelector(state => state.profile.avatar);
    const email = useAppSelector(state => state.profile.email);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        dispatch(setProfileTC())
    }, [])

    const setNewName = useCallback((name: string) => {
        dispatch(changeNameTC(name));
    }, [dispatch, name]);

    const logout = useCallback(() => {
        dispatch(logoutTC());
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={LOGIN}/>
    }

    return (
        <div className={s.container}>
            <div className={s.backToPacks}>
                <NavLink to={'/'} > <KeyboardBackspaceIcon sx={{position: 'relative', top: '6px'}}/>  Back to Packs List</NavLink>
            </div>
            <Grid container justifyContent={'center'}>
                <Grid item marginTop={'50px'} textAlign={"center"} width={'400px'}>
                    <Paper elevation={14} style={{padding: "30px"}}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '50%',
                            margin: '0 auto'
                        }}>
                            <Typography variant="h5" gutterBottom noWrap sx={{fontWeight: 'bold'}}>
                                Personal Information
                            </Typography>
                            <div style={{
                                backgroundImage: `url(${avatar})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                height: '120px',
                                width: '120px',
                                borderRadius: '50%',
                                margin: '10px 0 10px 0'
                            }}>
                            </div>
                            <div style={{cursor: 'pointer', fontSize: '20px' }}>
                                <SuperEditableSpan value={name} onChange={setNewName}/>
                            </div>
                            <Typography variant="h6" gutterBottom noWrap sx={{color: 'gray', margin: '10px 0 10px 0'}}>
                                {email}
                            </Typography>
                            <Button variant={'contained'}
                                    onClick={logout}
                                    color={'primary'}
                                    sx={{display: 'flex', justifyContent: 'space-around'}}
                                    fullWidth>
                                <LogoutIcon/>
                                Log out
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
});

export default Profile;