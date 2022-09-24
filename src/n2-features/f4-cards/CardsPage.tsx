import React, {useEffect} from 'react';
import {cardsAPI} from "../../n1-main/m3-dal/api/cards-api";
import {getCardsTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../n1-main/m1-ui/hooks";

export const CardsPage = () => {
    const dispatch=useAppDispatch()
    useEffect(()=>{
        dispatch(getCardsTC({cardsPack_id: "629fa8c5f0ffde100d74e176"}))
    },[])
    const cards=useAppSelector(state =>state.cards.cards)
    return (
        <div>
            {cards.map(el=><div>{el.question}</div>)}
        </div>
    );
};

