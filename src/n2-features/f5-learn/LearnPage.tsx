import React, {useEffect, useState, ChangeEvent} from "react";
import {getCardsTC, updateCardGradeTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {
    Button,
    Container,
    FormControl,
    FormControlLabel, FormLabel,
    Paper, Radio,
    RadioGroup,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../n1-main/m1-ui/hooks";
import {CardType} from "../../n1-main/m3-dal/api/cards-api";
import {BackToPackList} from "../f4-cards/CommonCardsPageComponents/BackToPackList";
import s from './LearnPage.module.css';

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useAppSelector(state => state.cards.cards);
    const packName = useAppSelector(state => state.cards.packName);

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        user_id: '',

        created: '',
        updated: '',
    });
    const [value, setValue] = useState<string>('');
    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(cards[0].cardsPack_id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, cards[0].cardsPack_id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            dispatch(updateCardGradeTC(value, cards[0].cardsPack_id, card._id))
            setCard(getCard(cards));
        }
    }

    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <div className={s.learnContainer}>
                    <div className={s.packTitleContainer}>
                        <span>Learn "{packName}"</span>
                    </div>
                    <Paper elevation={14} style={{padding: "30px", width: '350px'}}>
                        <div>
                            <div className={s.question}>
                                <p><b>Question:</b> {card.question}</p>
                            </div>

                            {isChecked && (
                                <>
                                    <div>
                                        <p><b>Answer:</b> {card.answer}</p>
                                    </div>

                                    <FormControl>
                                        <FormLabel>Rate yourself:</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            value={value}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                                        >
                                            {grades.map((g, i) => (
                                                <FormControlLabel
                                                    key={'grade-' + i}
                                                    value={g}
                                                    control={<Radio/>}
                                                    label={g}/>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </>
                            )}
                            <div className={s.buttonsContainer}>
                                {!isChecked
                                    ? <Button
                                        variant={'contained'}
                                        onClick={() => setIsChecked(true)}
                                        fullWidth>
                                        Show answer
                                    </Button>
                                    : <Button
                                        variant={'contained'}
                                        onClick={onNext}
                                        fullWidth>
                                        Next question
                                    </Button>
                                }
                            </div>
                        </div>
                    </Paper>
                </div>
        </Container>
    );
};

export default LearnPage;