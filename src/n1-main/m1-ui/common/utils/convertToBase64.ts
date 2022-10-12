export const convertFileToBase64ForCard = (
    file: File,
    callBack: (field: string, value: string) => void,
    field: string
) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(field, file64)
    }
    reader.readAsDataURL(file)
}

export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(file64)
    }
    reader.readAsDataURL(file)
}