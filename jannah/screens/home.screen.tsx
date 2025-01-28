
import {useState} from 'react';
import {Audio} from 'expo-av'; 
import { Alert } from 'react-native';

export default function HomeScreen() {

    const [text , setText] = useState('');
    const [isRecording , setIsRecording] = useState(false); //toggle enregistrement encours ou pas
    const [loading , setLoading] = useState(false);
    const [recording, setRecording] = useState <Audio.Recording> ();
    const [AIResponse, setAIResponse] = useState(false);

    //microphone permission
    const getMicrophonePermission = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync();//cette ligne de code me permet de demander la permission de l'utilisateur. Elle renvoie un objet avec une propriété granted qui indique si la permission a été accordée ou non.

            if(!granted) {
                    Alert.alert("Permission denied","We need your permission to record audio")
                    return false //return false veut dire qu'on a refuser la permission
            }

            return true //return true veut dire qu'on a accorde la permission
        } catch (error) {
            console.log (error)
            return false //pour indiquer qu'on a refuser la permission en cas d'erreur
        }
    }

    const recordingOptions:any = {
        android : {
            recordingOptions : {
               extension : '.wav',
               outPutFormat : Audio.AndroidOutputFormat.MPEG_4,
               AndroidEncoder : Audio.AndroidAudioEncoder.AAC,
               sampleRate : 44100,
               numberOfChannels : 2,
               bitRate : 128000
            }
        } ,
        ios: {
            extension: ".wav",
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
    } 

    const startRecording = async () => {
        const hasPermission = await getMicrophonePermission();

        if(!hasPermission) return;

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS : true, //cette option permet de permet de permettre a l'appelant de recorder
                playsInSilentModeIOS : true //cette option permet de permet de permettre a l'appelant de recorder en mode silencieux ainsi il pourra record avec l'application en arriere plan
            })
            setIsRecording(true)
            const {recordings} = await Audio.Recording.createAsync(recordingOptions) // cette ligne de code me permet de creer un enregistrement avec les options precedents

            setRecording(recordings) //je stock l'objet recording dans le state avec le mode d'enregistrement actif
        } catch (error) {
            console.log("failed to start recording", error)
            Alert.alert("Error", "failed to start recording")
        }
    }

    const stopRecording = async () => {
        try {
            setIsRecording (false)
            setLoading (true)
            await recording?.stopAndUnloadAsync() //stopper l'enregistrement 
            await Audio.setAudioModeAsync({
                allowsRecordingIOS : false,
                playsInSilentModeIOS : false,
            })
            const uri = recording.getURI() //recuperer l'uri de l'enregistrement
        }
    }




    }
