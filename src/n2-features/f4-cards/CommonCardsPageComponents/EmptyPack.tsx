import React from 'react';
import {Container, Grid} from "@mui/material";
import {BackToPackList} from "./BackToPackList";
import {CardsPageHead} from "./cardsPageHead/CardsPageHead";
import s from "../Cards.module.css";
import {useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {defaultCover} from "../../../n1-main/m1-ui/common/img/base64DefaultCover";
import {AddNewCardModal} from "../../f6-modals/AddNewCardModal";

export const EmptyPack = () => {

    const cards = useAppSelector(state => state.cards)
    const isMyPack = useAppSelector(state => state.cards.isMyPack)
    const packCover = useAppSelector(state => state.cards.packDeckCover)

    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
                <img src={packCover ? packCover : defaultCover}
                     style={{height: '140px', display: 'inline-block', margin: '24px 0px 0px 24px', borderRadius: '8px'}}
                />
            </Grid>
            {isMyPack
                ? <div className={s.emptyPack}>
                    <div>This pack is empty. Click add new card to fill this pack</div>
                    <AddNewCardModal cardsPackId={cards.cardsPackId}/>
                </div>
                : <div className={s.emptyPack}>
                    This pack is empty. Back to Pack List and change another Pack
                </div>
            }
        </Container>
    );
};

