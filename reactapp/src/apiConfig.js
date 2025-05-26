import axios from "axios";

const apiUrl = "https://ide-efdaebceabafefbdaecfbbcebdabeadeba.project.examly.io/proxy/8085"

export const authUser = async (userCredentials) => {
    const loggedInUser = await axios.post(`${apiUrl}/api/users/login`, JSON.stringify(userCredentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return loggedInUser;
}

export const registerUser = async (userDetails) => {
    return await axios.post(`${apiUrl}/api/user/register`, userDetails);
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