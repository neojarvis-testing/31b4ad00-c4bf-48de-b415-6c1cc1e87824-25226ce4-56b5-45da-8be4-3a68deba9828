import React, { useEffect, useState } from 'react'
import CustomerNavbar from './CustomerNavbar'
import { dispatchCurrentUser, getFeedbacksByUserId } from '../apiConfig';
import { useDispatch, useSelector } from 'react-redux';

const CustomerMyFeedback = () => {

  const [myFeedback,setMyFeedback]=useState([]);
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.userData.userInfo);

  // useEffect(()=>{
  //   async function fetchFeedbacks(){
  //     setMyFeedback(await getFeedbacksByUserId(getUser.userId));
  //   }
  //   getUser && fetchFeedbacks();
  // })

  useEffect(() => {
    dispatchCurrentUser(dispatch);
  }, [dispatch])

  return (
    <div>
        <CustomerNavbar/>
        <h2>CustomerMyFeedback</h2>
        {console.log("myFeedback::",myFeedback)}
    </div>
  )
}

export default CustomerMyFeedback