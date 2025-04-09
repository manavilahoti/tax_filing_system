import {account} from './appwriteConfig';

//register func
export const registerUser = async (email, password, userName) => {
    try {
        const user = await account.create('unique()',email,password,userName);
        
        await account.createVerification("http://localhost:3001/verify");
        
        return user;
    }
    catch (error) {
        throw error;
    }
};


//login function

export const loginUser = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    }
    catch (error){
        throw error;
    }
};

//get user
export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    }
    catch (error){
        return null;
    }
};

//logout user 

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
    }
    catch(error){
        throw error;
    }
};

//email verification
// export const sendVerification = async (redirectUrl) => {
//     try{
//         await account.createVerification(redirectUrl);
//     }
//     catch (error) {
//         throw error;
//     }
// };