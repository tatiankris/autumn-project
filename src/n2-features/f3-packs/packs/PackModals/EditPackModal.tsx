import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n1-main/m1-ui/hooks";
import {updatePackTC} from "../../../../n1-main/m2-bll/reducers/packs-reducer";
import {BasicModal} from "../../../../n1-main/m1-ui/common/BasicModal/BasicModal";
import {Button, Checkbox, FormControlLabel, IconButton, Stack, TextField} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ListItemIcon from "@mui/material/ListItemIcon";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {UploadPackCoverButton} from "./UploadPackCoverButton";

type PropsType = {
    id: string
    name: string
    private_?: boolean
    userId: string
    page: 'packs' | 'cards'
    packCover?: null | string
    cardsMenuClose?: () => void
}
export const EditPackModal = ({id, name, private_, userId, page, cardsMenuClose, packCover}: PropsType) => {


    const packCoverCards = useAppSelector(state => state.cards.packDeckCover)

    const [cover, setCover] = useState(page === 'packs' ? packCover : packCoverCards);
    const getDeckCover = (file64: string) => {
        setCover(file64);
    }

    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.profile._id)
    const [error, setError] = useState(false)


    const [value, setValue] = useState<string>(name)
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

    const deleteCover = () => {
        setCover(null)
    }
    const [checked, setChecked] = useState<boolean>(private_ ? private_ : false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(e.target.checked)}

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setValue(name)
        private_ && setChecked(private_)
        setError(false)
        setOpen(false)
        cardsMenuClose && cardsMenuClose()
    }

    const handleUpdate = () => {
        if (value.length < 1) {
            setError(true)
        } else {
            dispatch(updatePackTC({_id: id, name: value, deckCover: cover, private: checked}))
            handleClose()
            cardsMenuClose && cardsMenuClose()
        }
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
                    error={error}
                    helperText={error ? "Pack name cannot be empty!" : " "}
                />
                {private_ &&
                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Private pack" />
                }
                <UploadPackCoverButton callback={getDeckCover} />
                { cover &&
                    <div>
                    <img src={cover} width={'100%'} height={'180px'} style={{display: 'inline-block', marginTop: '8px'}}/>
                        <Button onClick={deleteCover} style={{background: '#FF3636'}} variant="contained">DELETE UPLOADED COVER</Button>
                    </div>

                        }
                <Stack direction="row" spacing={2} style={{width: '100%', marginTop: '8px'}} justifyContent={'space-around'}>
                    <Button  variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button  variant="contained" onClick={handleUpdate}>Save</Button>
                </Stack>
            </div>
        </BasicModal>
        </div>
    )
}