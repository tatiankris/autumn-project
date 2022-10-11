import React, {ChangeEvent, useState} from 'react';
import {BasicModal2} from "./BasicModal2";
import {Button, FormGroup, IconButton, Stack, TextField} from "@mui/material";
import {updateCardTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {useAppDispatch} from "../../n1-main/m1-ui/hooks";
import {useFormik} from "formik";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {CardType} from "../../n1-main/m3-dal/api/cards-api";
import {convertFileToBase64ForCard} from "../../n1-main/m1-ui/common/utils/convertToBase64";


type PropsType = {
    card: CardType
}

export const EditCardModal = ({card}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!open)
    };

    const formik = useFormik({
        initialValues: {
            question: card.question,
            answer: card.answer,
            questionImg: card.questionImg,
            answerImg: card.answerImg,
        },
        onSubmit: values => {
            dispatch(updateCardTC({...values, _id: card._id}))
            handleOpenClose()
        },
    });

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64ForCard(file, formik.setFieldValue, field)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    return (
        <div>
            <IconButton onClick={handleOpenClose}><BorderColorIcon
                fontSize={"small"}/></IconButton>
            <BasicModal2 title={'Edit card'} open={open} handleOpenClose={handleOpenClose}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction={"column"} spacing={10} justifyContent={"space-evenly"}>
                        <FormGroup>
                            {!card.questionImg
                                ? <>
                                    <TextField style={{margin: "10px 0"}}
                                               label="Question"
                                               variant="standard"
                                               type="text"
                                               {...formik.getFieldProps('question')}/>
                                    <TextField
                                        style={{margin: "10px 0"}}
                                        label="Answer"
                                        variant="standard"
                                        type="text"
                                        {...formik.getFieldProps('answer')}/>
                                </>
                                : <>
                                    <div>
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <p><b>Question:</b></p>
                                            <label htmlFor="cardQuestion"
                                                   style={{cursor: 'pointer', color: 'blue', paddingTop: '15px'}}>Change
                                                cover</label>
                                            <input type="file"
                                                   id="cardQuestion"
                                                   name="questionImage"
                                                   onChange={(e) => uploadHandler(e, 'questionImg')}
                                                   accept="image/*"
                                                   style={{display: 'none'}}/>
                                        </div>
                                        <img
                                            src={formik.values.questionImg}
                                            style={{height: '100px', display: 'block', margin: '0 auto'}}
                                            alt=''/>
                                    </div>
                                    <div>
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <p><b>Answer:</b></p>
                                            <label htmlFor="cardAnswer"
                                                   style={{cursor: 'pointer', color: 'blue', paddingTop: '15px'}}>Change
                                                cover</label>
                                            <input type="file"
                                                   id="cardAnswer"
                                                   name="answerImage"
                                                   onChange={(e) => uploadHandler(e, 'answerImg')}
                                                   accept="image/*"
                                                   style={{display: 'none'}}/>
                                        </div>
                                        <img
                                            src={formik.values.answerImg}
                                            style={{height: '100px', display: 'block', margin: '0 auto'}}
                                            alt=''/>
                                    </div>
                                </>
                            }
                        </FormGroup>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Button variant={'contained'} style={{width: "100px"}} color={'inherit'}
                                    onClick={handleOpenClose}>
                                Cancel
                            </Button>
                            <Button type={'submit'} variant={'contained'} style={{width: "100px"}} color={'primary'}>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>

            </BasicModal2>
        </div>
    );
};
