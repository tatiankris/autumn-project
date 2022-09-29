import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector, useDebounce} from "../../n1-main/m1-ui/hooks";
import {MyEmptyPack} from "./EmptyPackPage/MyEmptyPack";
import {FriendsEmptyPack} from "./EmptyPackPage/FriendsEmptyPack";
import {MyCardsPage} from "./Cards/MyCardsPage";
import {FriendsCardsPage} from "./Cards/FriendsCardsPage";
import {getCardsTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {useParams} from "react-router-dom";


export interface Data {
    question: string;
    answer: string;
    lastUpdated: string;
    grade: number;
    _id:string
}

export function createData(
    question: string,
    answer: string,
    lastUpdated: string,
    grade: number,
    _id:string
): Data {
    return {question, answer, lastUpdated, grade, _id};
}

export function CardsPage() {
    const {packId}=useParams()
    const dispatch = useAppDispatch();

    const page=useAppSelector(state => state.cards.page)
    const pageCount=useAppSelector(state => state.cards.pageCount)
    const search=useAppSelector(state => state.cards.search)
    const debounceSearchValue = useDebounce<string>(search, 1000)
    const sort=useAppSelector(state => state.cards.sort)

    useEffect(()=>{
        if (packId != null) {
            dispatch(getCardsTC(packId))
        }
    },[page,pageCount,sort,debounceSearchValue])

    const cards = useAppSelector(state => state.cards)
    const userId=useAppSelector(state => state.profile._id)


    if(!cards.cards.length && userId!==cards.packUserId && !search.length){
        return <FriendsEmptyPack/>
    }
    if(cards.cards.length && userId===cards.packUserId){
        return <MyCardsPage/>
    }
    if(!cards.cards.length && userId===cards.packUserId && !search.length){
        return <MyEmptyPack/>
    }

        return <FriendsCardsPage/>

}
