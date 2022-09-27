import React from 'react';
import {Container, Grid} from "@mui/material";
import {BackToPackList} from "../CommonCardsPageComponents/BackToPackList";
import {CardsPageHead} from "../CommonCardsPageComponents/CardsPageHead";
import s from "../CardsPage.module.css"

export const FriendsEmptyPack = () => {
    return (
    <Container maxWidth="lg">
        <BackToPackList/>
        <Grid container spacing={3} marginTop={'8px'}>
            <CardsPageHead/>
        </Grid>
        <div className={s.emptyPack}>
            This pack is empty. Back to Pack List and change another Pack
        </div>
    </Container>
)};
