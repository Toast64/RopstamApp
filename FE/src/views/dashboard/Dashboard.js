import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CDataTable,
} from '@coreui/react'
import { render, unmountComponentAtNode } from 'react-dom'
import CustomModal from '../Modal'
import Config from '../../config'
import axios from 'axios'


/**
* @param  totaldata - holds all the recieved data from the database
*/
let totaldata = []

const Dashboard = () => {
  /**
   * @param baseUri - holds the base uri for the api calls and it is imported from config file
   */
  const baseUri = Config.API_BASE_URI;
  const [totalcars, setTotalCars] = useState(0);
  const [apicalltogglecat, setApiCallToggleCat] = useState(false);
  const [apicalltoggle, setApiCallToggle] = useState(false);
  const [requireddata, setRequiredData] = useState([]);
  const [deletesingleitem, setDeleteSingleItem] = useState(null)
  const [detailsModal, setDetailsModal] = useState('')
  const [detailsModalData, setDetailsModalData] = useState(null)

  useEffect(() => {
    axios.get(baseUri + 'cars/getAllCars')
      .then(res => {
        totaldata = res.data
        setTotalCars(totaldata.length)
        setApiCallToggleCat(true)
      })

  }, [])

  // This useEffect will be called when the modal is called
  // The modal is used for the edit and create buttons. When they are clicked, The modal will be called.
  useEffect(() => {
    if (detailsModal === "Create" || detailsModal === "Edit") {
      render(
        <CustomModal title={detailsModal} clean={clean}
          functionalButton={
            {
              // this functional button will according to our chosen button. If we have clicked button for create
              // it will show the modal for creating a new car. If we have clicked button for edit, it will show
              // the modal for editing the car.
              color: detailsModal === 'Create' || detailsModal === 'Edit' ? 'success' : '',
              text: detailsModal === 'Create' || detailsModal === 'Edit' ? 'Save' : '',
              enable: detailsModal === 'Create' || detailsModal === 'Edit' ? true : false,
              callback: (id, data) => {

                let uri = baseUri + "cars/cu/" +
                  (detailsModal === "Create" ? 'addCar' : 'update/') +
                  (detailsModal === "Edit" ? id : '');

                // api call is made to add new data or update existing data in the database
                // all this data is coming from the modal
                axios.post(uri, data)
                  .then(res => console.log(res))
              }
            }
          }
          readOnly={
            detailsModal === "Create" || detailsModal === "Edit" ? false :
              (detailsModal === "View" ? true : true)
          }
          data={detailsModalData}
        >
        </CustomModal>,
        document.getElementById('popup-modal-container')
      );
    }
    setDetailsModal('')
    setDetailsModalData(null)
  }, [detailsModal])

  const clean = () => {
    return unmountComponentAtNode(document.getElementById('popup-modal-container'));
  }

  // function for deletion of a single entry
  const deleteSingle = (id) => {
    let temparr = []
    axios.delete(baseUri + "cars/delete/" + id)
      .then((res) => {
        totaldata = totaldata.filter((item, index) => item.id !== id)
        requireddata.pop()
        temparr = totaldata
        for (let i = 0; i < totaldata.length; i++) {
          requireddata[i] = temparr[i]
        }
        setRequiredData(temparr)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // getting all 
  const getData = () => {
    axios.get(baseUri + 'cars/getAllCars')
      .then(res => {
        for (let i = 0; i < totaldata.length; i++) {
          requireddata.push(totaldata[i])
        }
        setRequiredData(requireddata)
        setApiCallToggle(true)
      })
  }

  return (
    <>
      <div id="popup-modal-container"></div>

      <CCard>
        <CCardBody>
          <CRow>
            <div className='w-100'>
              <div className='d-flex justify-content-center'>
                <h1>Welcome to the Dashboard</h1>
              </div>
            </div>
          </CRow>
          <CRow>
            <div className='w-100 mt-3'>
              <div className='d-flex justify-content-center'>
                <h5>We have total number of {totalcars} vehicles</h5>
              </div>
            </div>
          </CRow>
          <CRow>
            <div className='w-100 mt-3'>
              <div className='d-flex justify-content-center'>
                <div>
                  <CButton color="danger" onClick={getData}>Fetch Data</CButton>
                  <CButton color="success"
                    className="ml-2"
                    onClick={() => {
                      setDetailsModal('Create')
                      render(
                        <CustomModal title={detailsModal} clean={clean}
                          functionalButton={
                            {
                              color: detailsModal === 'Create' || detailsModal === 'Edit' ? 'success' : '',
                              text: detailsModal === 'Create' || detailsModal === 'Edit' ? 'Save' : '',
                              enable: detailsModal === 'Create' || detailsModal === 'Edit' ? true : false,
                              callback: (id, data) => {

                                let uri = baseUri + "cars/cu/" +
                                  (detailsModal === "Create" ? 'addCar' : 'update/') +
                                  (detailsModal === "Edit" ? id : '');
                                axios.post(uri, data)
                                  .then(res => console.log(res))
                              }
                            }
                          }
                          readOnly={
                            detailsModal === "Create" || detailsModal === "Edit" ? false :
                              (detailsModal === "View" ? true : true)
                          }
                          data={detailsModalData}
                        ></CustomModal>,
                        document.getElementById('popup-modal-container')
                      )
                    }}>Add Car</CButton>
                </div>

              </div>
            </div>
          </CRow>
          <CRow>
            <div className='w-100 mt-5'>
              <CDataTable
                items={
                  apicalltoggle === true ? requireddata :
                    null
                }
                hover
                striped
                pagination
                itemsPerPageSelect
                outlined
                sorter
                itemsPerPage={10}
                fields={
                  [
                    "category",
                    "model",
                    "color",
                    "make",
                    "regno",
                    "action"
                  ]
                }
                scopedSlots={{
                  "action":
                    (item) => (
                      <td>
                        <CButton className="mr-2" color="danger" onClick={() => {
                          let id = item.id
                          setDeleteSingleItem(id)
                          deleteSingle(id)
                        }}>Delete</CButton>
                        <CButton color="warning"
                          onClick={() => {
                            setDetailsModal('Edit')
                            setDetailsModalData(item)
                          }}>
                          Edit</CButton>
                      </td>
                    )
                }}
              >

              </CDataTable>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
