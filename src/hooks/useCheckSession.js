import { useEffect } from "react"

function useCheckSession({isLogged, userId}) {
    useEffect(() => {
        if (isLogged && userId) {
            console.log("Ingreso a la plataforma")
            console.log(userId)
        }
    }, [isLogged, userId])

  return
}

export default useCheckSession