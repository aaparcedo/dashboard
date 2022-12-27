import { Outlet, Navigate } from 'react-router-dom'
// import { getAuth } from "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from './firebase'

const PrivateRoutes = () => {
    let credentials = useAuthState(auth);
    console.log(credentials);
    return (
        credentials ? < Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes