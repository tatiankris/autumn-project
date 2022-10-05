import React from 'react';
import TableCell from "@mui/material/TableCell";
import {IconButton, Rating, Stack} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TableRow from "@mui/material/TableRow";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {CardType} from "../../../n1-main/m3-dal/api/cards-api";
import {deleteCardTC, updateCardTC} from "../../../n1-main/m2-bll/reducers/cards-reducer";

type PropsType={
    card:CardType
}

export const CardsTableBody = ({card}:PropsType) => {
    const dispatch = useAppDispatch()
    const isMyPack=useAppSelector(state =>state.cards.isMyPack)
    const deleteCardHandler = () => {
        dispatch(deleteCardTC(card._id))
    }
    const updateCardHandler = () => {
        dispatch(updateCardTC(card._id))
    }
    return (
            <TableRow
                hover
                key={card._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell align="left" width={"39%"}>{card.question}</TableCell>
                <TableCell align="left" width={"36%"}>{card.answer}</TableCell>
                <TableCell align="center" width={"13%"}>{card.updated.slice(0, 10)}</TableCell>
                <TableCell align="left" width={"9%"}>
                    <Rating name="grade" value={card.grade} readOnly />
                </TableCell>
                {isMyPack && <TableCell align="left" width={"2%"}>
                    <Stack direction={"row"} spacing={0}>
                        <IconButton onClick={updateCardHandler}><BorderColorIcon
                            fontSize={"small"}/></IconButton>
                        <IconButton onClick={deleteCardHandler}><DeleteOutlineIcon
                            fontSize={"small"}/></IconButton>
                    </Stack>
                </TableCell>}
            </TableRow>
    );
};
