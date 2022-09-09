import React, { useState } from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../common/c4-SuperEditableSpan/SuperEditableSpan";

const TestingComponent = () => {

    let [value, setValue] = useState<string>('edit text')

    return (
        <div>
            Testing
            <div><SuperInputText/></div>
            <div><SuperButton>button</SuperButton></div>
            <div><SuperCheckbox/></div>
            <div><SuperEditableSpan value={value} onChangeText={setValue}/></div>
        </div>
    )
}

export default TestingComponent;