import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector, useDebounce} from "../../n1-main/m1-ui/hooks";
import {Container, Grid} from "@mui/material";
import {BackToPackList} from "./CommonCardsPageComponents/BackToPackList";
import {CardsPageHead} from "./CommonCardsPageComponents/cardsPageHead/CardsPageHead";
import {CardSearch} from "./CommonCardsPageComponents/CardSearch";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {getCardsTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {MyPagination} from "./CommonCardsPageComponents/MyPagination";
import {CardsTableHead} from "./CommonCardsPageComponents/CardsTableHead";
import {EmptyPack} from "./CommonCardsPageComponents/EmptyPack";
import {Navigate, useParams} from "react-router-dom";
import {CardsTableBody} from "./CommonCardsPageComponents/CardsTableBody";
import {PACKS} from "../../n1-main/m1-ui/routing/Routing";
import {defaultCover} from "../../n1-main/m1-ui/common/img/base64DefaultCover";


export const Cards = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const search = useAppSelector(state => state.cards.search)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const debounceSearchValue = useDebounce<string>(search, 1000)
    const sort = useAppSelector(state => state.cards.sort)
    const packCover = useAppSelector(state => state.cards.packDeckCover)
    const {packId} = useParams()

    useEffect(() => {
        if (packId) {
            dispatch(getCardsTC(packId))
        }
    }, [page, pageCount, sort, debounceSearchValue])

    if (!cards.length && !search.length) {return <EmptyPack/>}

    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
                <img src={packCover ? packCover : defaultCover}
                     style={{height: '140px', display: 'inline-block', margin: '24px 0px 0px 24px', borderRadius: '8px'}}
                />
                <CardSearch/>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <CardsTableHead/>
                    <TableBody>
                        {cards.map((card, i) => <CardsTableBody key={i} card={card}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
                <MyPagination/>
            </Grid>
        </Container>
    );
};

