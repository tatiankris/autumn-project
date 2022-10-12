import React, {useState, ChangeEvent} from 'react';
import {BasicModal2} from "./BasicModal2";
import {
    Box,
    Button,
    FormControl,
    FormGroup,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import {addCardTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {useAppDispatch} from "../../n1-main/m1-ui/hooks";
import {useFormik} from "formik";
import {convertFileToBase64ForCard} from '../../n1-main/m1-ui/common/utils/convertToBase64';


type PropsType = {
    cardsPackId: string
}

type QuestionModeType = 'text' | 'picture';

export const AddNewCardModal = ({cardsPackId}: PropsType) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!open)
        formik.resetForm()
    };
    const [questionMode, setQuestionMode] = useState<QuestionModeType>('text');

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            questionImg: '',
            answerImg: '',
        },
        onSubmit: values => {
            dispatch(addCardTC({...values, cardsPack_id: cardsPackId}))
            handleOpenClose()
            formik.resetForm()
        },
    });

    const handleChange = (e: SelectChangeEvent) => {
        setQuestionMode(e.target.value as QuestionModeType);
        formik.resetForm();
    };

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
            <Button onClick={handleOpenClose} variant="contained"> Add new card </Button>
            <BasicModal2 title={'Add new Card'} open={open} handleOpenClose={handleOpenClose}>
                <form onSubmit={formik.handleSubmit}>
                    <p style={{color: 'gray', fontSize: '12px'}}>Choose a question format</p>
                    <Box>
                        <FormControl fullWidth>
                            <Select
                                value={questionMode}
                                onChange={handleChange}
                            >
                                <MenuItem value={'text'}>Text</MenuItem>
                                <MenuItem value={'picture'}>Picture</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Stack direction={"column"} spacing={10} justifyContent={"space-evenly"}>
                        <FormGroup>
                            {questionMode === 'text'
                                ? <>
                                    <TextField
                                        style={{margin: "10px 0"}}
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
                            <Button type={'submit'} variant={'contained'} style={{width: "100px"}}
                                    color={'primary'}>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>

            </BasicModal2>
        </div>
    );
};
