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