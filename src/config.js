import AsyncStorage from '@react-native-community/async-storage'

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        return value
    } catch (e) {
        console.log(e)
    }
}