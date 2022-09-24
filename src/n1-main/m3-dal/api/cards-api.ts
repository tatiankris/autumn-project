import {instance} from "./autumn-api";
import {AxiosResponse} from 'axios';

export const cardsAPI = {
    getPaks(){
      return instance.get("cards/pack?min=110")
    },
    postPack(){
        return instance.post("cards/pack", {cardsPack: {name: "test pack2"}})
    },
    getCards(params:GetCardsParamsType) {
        return instance.get<GetCardsResponseType>("cards/card", {params})
    },
    postCards() {
        return instance.post("cards/card", {card:{cardsPack_id: "632efe6a22d1d4000415be20", question: "who are you warrior?" }})
    },
    deleteCard(id:string){
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCard(card:UpdateCardType){
        return instance.put("cards/card",{card})
    }
}


export type PostCardType = {
    cardsPack_id: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
}

export type UpdateCardType=PostCardType & {
    comments?:string
}

export type GetCardsParamsType={
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?:number,
    pageCount?: number
}

export type GetCardsResponseType = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover?: any;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
}

export type CardType={
    answer: string
    question: string
    cardsPack_id: string
    grade:number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}