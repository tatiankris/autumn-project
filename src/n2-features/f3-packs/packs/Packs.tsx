import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {
    Container} from "@mui/material";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../n1-main/m1-ui/hooks";
import {setPacksTC} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {PacksPageHead} from "./PacksPageComponents/PacksPageHead/PacksPageHead";
import {PacksPageTable} from "./PacksPageComponents/PacksPageHead/PacksPageTable";
import {PacksPagePagination} from "./PacksPageComponents/PacksPageHead/PacksPagePagination";

const Packs = () => {

    const dispatch = useAppDispatch();

    const isMyId = useAppSelector(state => state.packs.isMyId);
    const page = useAppSelector(state => state.packs.page)
    const search = useAppSelector(state => state.packs.search);
    const debounceSearchValue = useDebounce<string>(search, 700);

    useEffect(() => {
        dispatch(setPacksTC())
    }, [debounceSearchValue, page, isMyId])

    return <Container maxWidth="lg">
        <PacksPageHead />
        <PacksPageTable/>
        <PacksPagePagination/>
    </Container>
}

export default Packs;

