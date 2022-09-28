import React from 'react';
import {Button, Grid} from "@mui/material";
import s from "../CardsPage.module.css";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {addCardTC} from "../../../n1-main/m2-bll/reducers/cards-reducer";


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
                <div className={s.packName}>{cards.packName}</div>
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

