import { Outlet, Navigate } from 'react-router-dom'
import { getAuth } from "firebase/auth"

const PrivateRoutes = () => {
    let auth = getAuth();
    return (
        auth ? < Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes