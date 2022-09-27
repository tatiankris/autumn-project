import React from 'react';
import {Button, Container, Grid} from "@mui/material";
import {BackToPackList} from "../CommonCardsPageComponents/BackToPackList";
import {CardsPageHead} from "../CommonCardsPageComponents/CardsPageHead";
import s from "../CardsPage.module.css";

export const MyEmptyPack = () => {
    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
            </Grid>
            <div className={s.emptyPack}>
                <div>This pack is empty. Click add new card to fill this pack </div>
                <Button variant="contained"> Add new card </Button>
            </div>
        </Container>
    );
};

