import React, { useEffect, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"



export default function index () {
    const [isOnboarding, setIsOnboarding] = useState (true) // ce state va nous servir pour savoir si l'onboarding est affiché
    const [loading, setLoading] = useState (true) // ce state va nous servir pour savoir si l'application est chargée

    useEffect (() => {
       const checkOnboarding = async () => {
          const isOnboarding = await AsyncStorage.getItem ("onboarding")
          if(isOnboarding) {
            setIsOnboarding (false)
          }
          setLoading (false)
       }

       checkOnboarding () 
    }, [])


    return (
      <Redirect href={isOnboarding ? "/(routes)/onboarding" : ""} />
    )


}