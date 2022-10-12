import React, {ChangeEvent, useState} from 'react'
import {Alert, AlertTitle, Button} from "@mui/material";
type PropsType = {
    callback: (file64: string) => void

}
export const UploadPackCoverButton = ({callback}: PropsType) => {

    const [errorImg, setErrorImg] = useState(false)

    const alertErrorImg = () => {
        setErrorImg(true)
        setTimeout (() => {
            setErrorImg(false)
        }, 2000)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                    callback(file64);
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                alertErrorImg();
                }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }



    return (
        <div>
            {
                errorImg &&
                <Alert severity="error" style={{
                    position: 'absolute' as 'absolute',
                    top: '-16%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '240px'

                }}>Error: The file is too big!</Alert>
            }
            <label style={{marginTop: '10px'}}>
                <input type="file"
                       onChange={uploadHandler}
                       accept="image/*"
                       style={{display: 'none'}}
                />
                <Button variant="contained" component="span" style={{width: '100%'}}>
                    UPLOAD PACK COVER
                </Button>
            </label>
        </div>
    )
}