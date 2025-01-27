//ce fichier est le layout de l'application il permet de gerer le theme de l'application
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { Stack} from "expo-router"
import * as SplashScreen from "expo-splash-screen" //il s'agit  

import { useColorScheme} from "@/hooks/useColorScheme"
import { useFonts} from "expo-font"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  //useColorSchme est un hook qui permet de recuperer le theme (light ou dark) du systeme
 const colorScheme = useColorScheme()

 const [loaded] = useFonts({
  SpaceMono : require ("../assets/fonts/SpaceMono-Regular.ttf"),
  SegoeUI : require ("../assets/fonts/SegoeUI.ttf"),
 })

 useEffect (() => {
  if (loaded) {
     const hideSplashScreen = async () => {
       if(loaded) {
         await SplashScreen.hideAsync()
       }
     }
     hideSplashScreen()
  }
}, [loaded])

if (!loaded) {
  return null
}


  return (
    <ThemeProvider value={ colorScheme === "dark" ? DarkTheme : DefaultTheme}>
       <Stack screenOptions={{headerShown : false}}>
            <Stack.Screen name="index"  />
            <Stack.Screen name="(routes)/onboarding/index" />
            <Stack.Screen name="(routes)/home/index" />
       </Stack>
        
    </ThemeProvider>
  )
}