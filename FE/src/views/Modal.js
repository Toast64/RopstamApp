/* eslint-disable */
import React, { useState } from 'react'
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CButton,
    CForm,
    CInput,
    CLabel,
    CFormGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

/**
* Renders a Custom modal 
* @param  props
* @param  props.enable - whether the functional button is enabled or not
* @param  props.functionalButton - JS object that has color, text and callback for functional button
* @param  props.functionalButton.color - uses Bootstrap color coding
* @param  props.functionalButton.text - text to put in functional button
* @param  props.functionalButton.callback - callback for pressing functional button condition
* @param  props.clean - used to clean up caller in case of closing
* @param  props.title - title of page
*/
const CustomModal = (props) => {
    let btn = props.functionalButton;
    const [hidemodal, setHideModal] = useState(false);

    let button = () => { };

    const readOnly = () => {
        return props.readOnly ? true : false;
    }

    let data = {
        category: '',
        model: '',
        color: '',
        make: '',
        regno: ''
    };

    if (props.data) {
        data = props.data;
        // console.log(data);
    }

    if (!data.id)
        delete data.id;

    if (btn) {
        button = () => {
            return (<CButton className="mr-2" color={btn.color} onClick={() => {
                if (btn.callback(data.id, data)) {
                    close();
                }
            }}>
                {btn.text}
            </CButton>)
        }
    }

    const handleFormChange = (e) => {
        data[e.target.name] = e.target.value;
    }

    const close = () => {
        setHideModal(true)
    }

    return (
        <>
            <div id="popup-custom-modal" className="w-100 h-100" hidden={hidemodal} style={{ background: "#00000033", top: 0, left: 0, zIndex: 100000000, position: "fixed", overflowY: 'scroll' }}>
                <CContainer className="my-5">
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>{props.title}</div>
                                        <div>
                                            <CButton onClick={close}>
                                                <CIcon size={'sm'} name={'cilX'} color="dark"></CIcon>
                                            </CButton>
                                        </div>
                                    </div>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol>
                                            <CForm>
                                                <CRow>
                                                    <CCol>
                                                        <CFormGroup>
                                                            <CLabel>Category</CLabel>
                                                            <CInput onChange={handleFormChange} type="text" name="category" placeholder='Category' readOnly={readOnly()} defaultValue={data.category}></CInput>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="8">
                                                        <CFormGroup>
                                                            <CLabel>Model</CLabel>
                                                            <CInput onChange={handleFormChange} type="text" placeholder='Model' name="model" readOnly={readOnly()} defaultValue={data.model} required></CInput>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol>
                                                        <CFormGroup>
                                                            <CLabel>Color</CLabel>
                                                            <CInput onChange={handleFormChange} type="text" placeholder='Color' name="color" readOnly={readOnly()} defaultValue={data.color} required></CInput>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="8">
                                                        <CFormGroup>
                                                            <CLabel>Make</CLabel>
                                                            <CInput onChange={handleFormChange} type="text" placeholder='Make' name="make" readOnly={readOnly()} defaultValue={data.make} required></CInput>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol>
                                                        <CFormGroup>
                                                            <CLabel>RegNo</CLabel>
                                                            <CInput onChange={handleFormChange} type="text" placeholder='RegNo' name="regno" readOnly={readOnly()} defaultValue={data.regno} required></CInput>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                            </CForm>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                                <CCardFooter>
                                    {props.enable === undefined || props.enable === true ? button() : null}
                                    <CButton color="secondary" onClick={close}>Close</CButton>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}

export default CustomModal;