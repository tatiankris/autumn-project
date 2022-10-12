import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {BasicModal} from "../../../../n1-main/m1-ui/common/BasicModal/BasicModal";
import {Alert, Button, Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import {createPackTC} from "../../../../n1-main/m2-bll/reducers/packs-reducer";
import {useAppDispatch} from "../../../../n1-main/m1-ui/hooks";
import {UploadPackCoverButton} from "./UploadPackCoverButton";
import { defaultCover } from '../../../../n1-main/m1-ui/common/img/base64DefaultCover';

export const AddNewPackModal = () => {

    const dispatch = useAppDispatch()
    const [error, setError] = useState(false)


    const [value, setValue] = useState('')
    const [cover, setCover] = useState(defaultCover);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)}



    useEffect( () => {
        if (value.trim().length === 0) {
            setError(true)
        }
        else {
            setError(false)
        }
    }, [value])

    const [checked, setChecked] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setError(false)
        setValue('')
        setCover(defaultCover)
        setChecked(false)
    }

    const getDeckCover = (file64: string) => {
        setCover(file64);
    }
    const deleteCover = () => {
        setCover(defaultCover)
    }

    const handleSave = () => {
        if (error) {
            return
        } else if (value.trim().length < 1) {
            setError(true)
            return
        } else {

            dispatch(createPackTC({name: value, deckCover: cover, private_: checked}))
            handleClose()
            setValue('')
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Add New Pack</Button>

            <BasicModal title={'Add new pack'}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
            >
                <div>
                    <TextField
                        fullWidth
                        required
                        id="standard-required"
                        label="Name Pack"
                        variant="standard"
                        value={value}
                        onChange={onChangeHandler}
                        margin={'normal'}
                        error={error}
                        helperText={error ? "Pack name cannot be empty!" : " "}
                    />
                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Private pack" />
                    <UploadPackCoverButton callback={getDeckCover} />
                    {
                        cover !== defaultCover &&
                        <div>
                        <img src={cover} width={'100%'} height={'180px'} style={{display: 'inline-block', marginTop: '8px'}}/>
                        <Button onClick={deleteCover} style={{background: '#FF3636'}} variant="contained">DELETE UPLOADED COVER</Button>
                        </div>
                    }
                    <Stack marginTop={'8px'} direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-around'}>
                        <Button  variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button  variant="contained" onClick={handleSave}>Save</Button>
                    </Stack>
                </div>
            </BasicModal>
        </div>


    )
}