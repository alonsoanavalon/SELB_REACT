import { useEffect } from "react"
import axios from 'axios'

function useCheckSession({isLogged, userId}) {
    

    useEffect(() => {
        const createSessionLogged = async () => {
            const url = `${process.env.REACT_APP_API_URL}/api/session-logged`
            const body = {
                user_id: userId,
                session_type: "PLATFORM_LOGIN"
            }
    
            await axios.post(url, body)
        }

        if (isLogged && userId) {
            createSessionLogged()
        }
    }, [userId, isLogged])

  return
}

export default useCheckSession