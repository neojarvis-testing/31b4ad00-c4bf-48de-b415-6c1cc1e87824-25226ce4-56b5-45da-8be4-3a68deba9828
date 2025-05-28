import axios from "axios";

const apiUrl = "https://8080-bdcaafcceecabdaecfbbcebdabeadeba.project.examly.io"


export const authUser = async (userCredentials) => {


    // const loggedInUser = await axios.post(`${apiUrl}/test`,
    // {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });

    // console.log(loggedInUser);




    console.log(userCredentials);
    // console.log("received login call")
    // console.log(JSON.stringify(userCredentials));
    const loggedInUser = await axios.post(`${apiUrl}/api/users/login`, JSON.stringify(userCredentials),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    console.log(loggedInUser);
    return loggedInUser;
}

export const registerUser = async (userDetails) => {

    return await axios.post(`${apiUrl}/api/user/register`, userDetails, {
        headers: {
            'Content-Type': "application/json",
        }
    });
}

export const getUserByEmailId = async (emailId) => {
    return await axios.get(`${apiUrl}/api/user/byEmail/${emailId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const dispatchCurrentUser = async (dispatch) => {
    const userEmail = localStorage.getItem("email");
    const user = await getUserByEmailId(userEmail);
    dispatch(user);
}

export const addLoanApplication = async (loanapplication) => {
    return await axios.post(`${apiUrl}/api/loanapplications`, loanapplication);
}

export const addFeedback = async (feedback) => {
    return await axios.post(`${apiUrl}/api/feedback`, feedback);
}

export const getFeedbacksByUserId = async (userId) => {
    return await axios.get(`${apiUrl}/api/feedback/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteFeedback = async (feedbackId) => {
    return await axios.delete(`${apiUrl}/api/feedback/${feedbackId}`)
}

export const getLoans = async (token) => {
    return await axios.get(`${apiUrl}/api/loans`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const getLoanApplicationsByUserId = async (userId) => {
    return await axios.get(`${apiUrl}/api/loanapplications/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const viewLoanApplicationById = async (loanId) => {
    return await axios.get(`${apiUrl}/api/loanapplications/${loanId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateLoanApplication = async (loanId, loanApplicationBody) => {
    return await axios.put(`${apiUrl}/api/loanapplications/${loanId}`, loanApplicationBody)
}

export const deleteLoanApplication = async (loanId) => {
    return await axios.delete(`${apiUrl}/api/loanapplications/${loanId}`)
}

export const getAllNotifications = async () => {
    return await axios.get(`${apiUrl}/api/notifications`)
}

export const updateNotification = async (notificationId, notificationBody) => {
    return await axios.put(`${apiUrl}/api/notification/${notificationId}`, notificationBody)
}