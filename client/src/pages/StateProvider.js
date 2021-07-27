import { getUser } from "./Utils";
import React, { useContext, useEffect, useState,useReducer } from "react";
export const UserContext = React.createContext();

const ErrorReducer = (state,action) =>{
    switch(action.status)
    {
        case 0:
            return null;
        case 401:
        case 400:
            return {
                message:action.message
            }
        case 500:
            return{
                message:action.message
        }
        
        default:
            return{
                message:"Some Unknown Error Occured!"
            }
        
    }
}

export const StateProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading,setUserLoading] = useState(true);
    const [PageError,setPageError] = useReducer(ErrorReducer, null);

    useEffect(() => {
        getUser(user, setUser).then(()=>{setUserLoading(false)});
    }, []);
    return (
        <UserContext.Provider value={[user, setUser,userLoading,PageError,setPageError]}>
            {children}
        </UserContext.Provider>
    );
};

export const useStateValue = () => useContext(UserContext);
