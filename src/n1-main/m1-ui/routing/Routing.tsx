import React from "react";
import {Route, Routes} from "react-router-dom";
import TestingComponent from "../../../n2-features/f0-first/a1-TestingComponent/TestingComponent";
import Profile from "../../../n2-features/f1-auth/a3-profile/Profile";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-registration/Registration";
import PasswordRecovery from "../../../n2-features/f2-password/a2-recovery/PasswordRecovery";
import NewPassword from "../../../n2-features/f2-password/a1-new/NewPassword";
import Error404 from "../../../n2-features/f0-first/a2-Error404/404";
import PasswordIsRecovery from "../../../n2-features/f2-password/a2-recovery/PasswordIsRecovered";

export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTRATION = '/registration'

export const PASSWORD_RECOVERY = '/password-recovery'
export const PASSWORD_RECOVERED = '/password-recovered'

export const NEW_PASSWORD = '/new-password/:token'

export const PROFILE = '/profile'

export const ERROR_404 = '/404'



const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path={ROOT} element={<TestingComponent/>}/>
                <Route path={PROFILE} element={<Profile/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>
                <Route path={PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PASSWORD_RECOVERED} element={<PasswordIsRecovery/>}/>
                <Route path={NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={ERROR_404} element={<Error404/>}/>
            </Routes>
        </div>
    )
}

export default Routing;