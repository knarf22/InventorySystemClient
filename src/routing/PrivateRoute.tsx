import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoute = () => {

    const [auth, setAuth] = useState<boolean|null>(null)
    useEffect(() => {
        axios.get("https://localhost:7270/api/Auth/me",{
            withCredentials : true
        })
        .then(() => setAuth(true))
        .catch(() => setAuth(false))
    }, [])
    
    if(auth === null) return <div>loading...</div>

  return auth? <Outlet /> : <Navigate to={"/login"} replace />
}

export default PrivateRoute
