import React from 'react';
import {Button, Grid} from "@mui/material";
import s from "../CardsPage.module.css";
import {useAppSelector} from "../../../n1-main/m1-ui/hooks";

export const CardsPageHead = () => {
    const cards = useAppSelector(state => state.cards)
    const userId=useAppSelector(state => state.profile._id)
    return (
        <>
            <Grid item xs={10}>
                <div className={s.packName}>{cards.packName}</div>
            </Grid>
            <Grid item xs={2}>
                {userId!==cards.packUserId && cards.cards.length
                     ?<Button variant="contained">Learn pack</Button>:null}
                {userId===cards.packUserId && cards.cards.length
                    ?<Button variant="contained"> Add new card </Button>:null}
            </Grid>
        </>
    );
};

