import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../n1-main/m1-ui/hooks";
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
    useEffect(()=>{
        if (packId != null) {
            dispatch(getCardsTC({cardsPack_id: packId}))
        }
    },[])
    const cards = useAppSelector(state => state.cards)
    const userId=useAppSelector(state => state.profile._id)

    if(!cards.cards.length && userId===cards.packUserId){
        return <MyEmptyPack/>
    }
    if(!cards.cards.length && userId!==cards.packUserId){
        return <FriendsEmptyPack/>
    }
    if(cards.cards.length && userId===cards.packUserId){
        return <MyCardsPage/>
    }

        return <FriendsCardsPage/>

}
