import React from "react";
import {NavLink} from "react-router-dom";
import {LOGIN, NEW_PASSWORD, PASSWORD_RECOVERY, PROFILE, REGISTRATION, ROOT} from "../routing/Routing";
import s from "../../../n2-features/f1-auth/a2-registration/Registration.module.css";
import {AppBar, Avatar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../hooks";

const Header = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const userName = useAppSelector(state => state.profile.name);
    const userAvatar = useAppSelector(state => state.profile.avatar);

    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontSize={'24px'}>
                    Learning Cards
                </Typography>
                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }} fontSize={'14px'}>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={ROOT} >TestComponent</NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={PROFILE} >Profile </NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={LOGIN} >Login </NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={REGISTRATION} >Registration </NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={PASSWORD_RECOVERY} >PasswordRecovery </NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={NEW_PASSWORD} >NewPassword </NavLink>
                </Typography>
                {
                isLoggedIn
                    ? <div style={{display: "flex", justifyContent: "center", alignItems: "center", minWidth: "300px"}}>
                        <NavLink style={{textDecoration: 'none', color: 'white'}} to={PROFILE}>{userName}</NavLink>
                        <Avatar alt={userName} src={userAvatar} style={{marginLeft: '10px'}} />
                </div>
                    : <Button  variant="contained" color="secondary" style={{
                    borderRadius: 35,
                    backgroundColor: "white",
                }}><NavLink style={{textDecoration: 'none', color: 'black', textTransform: "capitalize"}} to={LOGIN}>Log In</NavLink>
                    </Button>
            }
            </Toolbar>
        </AppBar>

    </Box>
    )
}

export default Header;