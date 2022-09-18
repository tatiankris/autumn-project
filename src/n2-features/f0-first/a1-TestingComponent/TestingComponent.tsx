import React, { useState } from "react";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";

const TestingComponent = () => {

    let [value, setValue] = useState<string>('edit text')

    return (
        <div>
            <div><SuperInputText/></div>
            <div><SuperButton>button</SuperButton></div>
            <div><SuperCheckbox/></div>
            <div><SuperEditableSpan value={value} onChange={setValue}/></div>
        </div>
    )
}

export default TestingComponent;