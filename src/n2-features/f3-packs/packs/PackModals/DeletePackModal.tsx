import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n1-main/m1-ui/hooks";
import {deletePackTC} from "../../../../n1-main/m2-bll/reducers/packs-reducer";
import {BasicModal} from "../../../../n1-main/m1-ui/common/BasicModal/BasicModal";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {PACKS} from "../../../../n1-main/m1-ui/routing/Routing";
import {useNavigate} from "react-router-dom";

type PropsType = {
    id: string
    name: string
    userId: string
    page: 'packs' | 'cards'
}
export const DeletePackModal = ({id, name, userId, page}: PropsType) => {

    const navigate = useNavigate()
    const myId = useAppSelector(state => state.profile._id)

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch();
    const handleDelete = () => {

        dispatch(deletePackTC(id))
        handleClose()

        page === 'cards' && navigate(PACKS)
    }

    return (
    <div style={{display: 'inline-block'}}>
        {
            page === 'packs' &&
            <IconButton onClick={handleOpen} style={{visibility: userId === myId ? 'visible' : 'hidden'}}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        }
        {
            page === 'cards' &&
            <ListItemIcon onClick={handleOpen}>
                <DeleteOutlineIcon fontSize="small"/>
            </ListItemIcon>
        }
        <BasicModal title={'Edit pack'}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}>
            <div>
                <Typography id="modal-modal-title" variant="h6" component="h6"
                            margin={'8px'}>
                    Do you really want to remove <b>{name}</b>?
                    All cards will be deleted.
                </Typography>
                <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-around'}>
                    <Button  variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button  style={{background: '#FF3636'}} variant="contained" onClick={handleDelete}>Delete</Button>
                </Stack>
            </div>
        </BasicModal>
    </div>
    )
}