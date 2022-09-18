import React, { useEffect } from "react";
import SuperEditableSpan from "../../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import { changeNameTC, setProfileAC} from "../../../n1-main/m2-bll/reducers/profile-reducer";
import {instance} from "../../../n1-main/m3-dal/api/autumn-api";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";

const Profile = React.memo(() => {
    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.profile.name);
    const avatar = useAppSelector(state => state.profile.avatar);
    const email = useAppSelector(state => state.profile.email);

    const setNewName = (name: string) => {
        dispatch(changeNameTC(name));
    }

    useEffect(() => {
        instance.post('/auth/login', {email: "nya-admin@nya.nya", password: "1qazxcvBG", rememberMe: false})
            .then(res => {
                dispatch(setProfileAC(res.data._id, res.data.name, res.data.email, res.data.avatar))
            })
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '80%', margin: '0 auto'}}>
            <div style={{border: '1px solid'}}>
                <NavLink to={'/'}>Back to Packs List</NavLink>
            </div>
            <div style={{
                border: '1px solid',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%',
                margin: '0 auto'
            }}>
                <h2>Personal Information</h2>
                <div style={{
                    backgroundImage: `url(${avatar})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '100px',
                    width: '100px',
                    borderRadius: '50%'
                }}>
                </div>
                <SuperEditableSpan value={name} onChange={setNewName}/>
                <span>{email}</span>
                <SuperButton>Log Out</SuperButton>
            </div>
        </div>
    )
});

export default Profile;