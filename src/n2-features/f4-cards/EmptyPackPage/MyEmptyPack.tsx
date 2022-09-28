import React from 'react';
import {Button, Container, Grid} from "@mui/material";
import {BackToPackList} from "../CommonCardsPageComponents/BackToPackList";
import {CardsPageHead} from "../CommonCardsPageComponents/CardsPageHead";
import s from "../CardsPage.module.css";
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {addCardTC} from "../../../n1-main/m2-bll/reducers/cards-reducer";

export const MyEmptyPack = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards)
    const addCard = () => {
        dispatch(addCardTC({cardsPack_id:cards.cardsPackId, question:"Who are you, warrior?"}))
    }
    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
            </Grid>
            <div className={s.emptyPack}>
                <div>This pack is empty. Click add new card to fill this pack </div>
                <Button onClick={addCard} variant="contained"> Add new card </Button>
            </div>
        </Container>
    );
};

