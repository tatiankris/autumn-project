import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n1-main/m1-ui/hooks";
import {updatePackTC} from "../../../../n1-main/m2-bll/reducers/packs-reducer";
import {BasicModal} from "../../../../n1-main/m1-ui/common/BasicModal/BasicModal";
import {Button, Checkbox, FormControlLabel, IconButton, Stack, TextField} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ListItemIcon from "@mui/material/ListItemIcon";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type PropsType = {
    id: string
    name: string
    private_?: boolean
    userId: string
    page: 'packs' | 'cards'
    cardsMenuClose?: () => void
}
export const EditPackModal = ({id, name, private_, userId, page, cardsMenuClose}: PropsType) => {


    const myId = useAppSelector(state => state.profile._id)

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [value, setValue] = useState<string>(name)
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const dispatch = useAppDispatch()

        const [checked, setChecked] = useState<boolean>(private_ ? private_ : false)
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(e.target.checked)
        };



    const handleUpdate = () => {
        dispatch(updatePackTC({_id: id, name: value, private: checked}))
        handleClose()

        cardsMenuClose && cardsMenuClose();
    }

    const handleCancel = () => {
        handleClose()
        cardsMenuClose && cardsMenuClose()
        setValue(name)

        private_ && setChecked(private_)
    }

    return (
        <div style={{display: 'inline-block'}}>
            {
                page === 'packs' && <IconButton onClick={handleOpen} style={{visibility: userId === myId ? 'visible' : 'hidden'}}>
                    <DriveFileRenameOutlineIcon fontSize="small"/>
                </IconButton>
            }
            {
                page === 'cards' &&
                    <ListItemIcon onClick={handleOpen}>
                        <BorderColorIcon fontSize="small"/>
                    </ListItemIcon>

            }
        <BasicModal title={'Edit pack'}
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
                />
                {private_ &&
                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Private pack" />
                }
                <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-around'}>
                    <Button  variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button  variant="contained" onClick={handleUpdate}>Save</Button>
                </Stack>
            </div>
        </BasicModal>
        </div>
    )
}