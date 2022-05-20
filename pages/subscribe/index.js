import { useMutation } from '@apollo/client'
import React, { useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { SUBSCRIBE } from '../categories/schema'
const Subscription = () => {
  const refEmail = useRef("")
  const [email, setEmail] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [addSubscribe, { loading, data, error }] = useMutation(SUBSCRIBE)
  const [errorPopup, setErrorPopup] = useState(false)
  const [popup, setPopup] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await addSubscribe({
      variables: {
        input: email
      }
    })
    if (response) {
      if (response.data.subscribe.status.response == "Failed") {
        setPopup(true)
        setErrorPopup(true)
        setResponseData(response.data.subscribe.status.message)
      } else {
        setPopup(true)
        setErrorPopup(false)
        setResponseData(response.data.subscribe.status.message)
      }
    }
    // console.log(response.data)
  }
  return (
    <div>
      <Navbar />
      <br /><br />
      <div className='container-fluid mt-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Subscriptions</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} ref={refEmail} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form><br />
        {
          popup ? (
            errorPopup ? (
              <div className="alert alert-danger" role="alert">
                {responseData}
              </div>
            ) :
              <div className="alert alert-primary" role="alert">
                {responseData}
              </div>
          ) : (
            <div></div>
          )
        }
      </div>
    </div>
  )
}

export default Subscription