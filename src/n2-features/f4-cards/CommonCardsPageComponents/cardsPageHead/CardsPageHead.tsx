import React from 'react';
import {Button, Grid, Stack} from "@mui/material";
import s from "../../Cards.module.css";
import {useAppDispatch, useAppSelector} from "../../../../n1-main/m1-ui/hooks";
import {addCardTC} from "../../../../n1-main/m2-bll/reducers/cards-reducer";
import {Menushka} from "./Menushka";


export const CardsPageHead = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile._id)
    const addCard = () => {
        dispatch(addCardTC({cardsPack_id:cards.cardsPackId, question:"Who are you, warrior?"}))
    }
    return (
        <>
            <Grid item xs={10}>
                <Stack className={s.packName} direction={"row"}>{cards.packName}<Menushka/></Stack>
            </Grid>
            <Grid item xs={2}>
                {userId !== cards.packUserId && cards.cards.length
                    ? <Button variant="contained">Learn pack</Button> : null}
                {userId === cards.packUserId && cards.cards.length
                    ? <Button onClick={addCard} variant="contained"> Add new card </Button> : null}
            </Grid>
        </>
    );
};

