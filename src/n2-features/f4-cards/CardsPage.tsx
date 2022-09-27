import React from 'react';
import {useAppSelector} from "../../n1-main/m1-ui/hooks";
import {MyEmptyPack} from "./EmptyPackPage/MyEmptyPack";
import {FriendsEmptyPack} from "./EmptyPackPage/FriendsEmptyPack";
import {MyCardsPage} from "./Cards/MyCardsPage";


export interface Data {
    question: string;
    answer: string;
    lastUpdated: string;
    grade: number;
}

export function createData(
    question: string,
    answer: string,
    lastUpdated: string,
    grade: number,
): Data {
    return {
        question,
        answer,
        lastUpdated,
        grade,
    };
}

export function CardsPage() {
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

        return <MyCardsPage/>

}
