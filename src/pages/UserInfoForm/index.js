import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import helpers from '../../utils/helpers'
import UploadContacts from '../UploadContacts'
const { width, height } = Dimensions.get('window')
function UserInfoForm(props) {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [showRegistrationPage, setShowRegistrationPage] = useState(true)
    const [showContactsUploaddPage, setShowContactsUploaddPage] = useState(false)
    const [isLoading, setIsloading] = useState(false);


    async function sumbit() {
        setIsloading(true)
        const data = {
            fullName: fullName.trim(),
            email: email.trim()
        }
        const response = await helpers.registration('Users', data)
        if (response.status === 200) {
            setShowRegistrationPage(false)
            setShowContactsUploaddPage(true)
            setIsError(false)
            setError('')
            setUserId(response.data._ref._documentPath._parts[1])
            setIsloading(false)
        } else {
            setIsError(true)
            setError(response.message)
            setIsloading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 5 }}>
            {isLoading && <View style={{ justifyContent: 'center', height: height - 30, position: 'absolute', width: width }}>
                <ActivityIndicator color="red" size={30} />
            </View>}
            {showContactsUploaddPage && <UploadContacts userId={userId} />}
            {showRegistrationPage &&
                <><View style={{ height: 100, justifyContent: 'center' }}>
                    <Text style={{ color: '#E35E1B', fontSize: 20, alignSelf: 'center' }}>Logo</Text>
                </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ marginBottom: 5 }}>Name</Text>
                        <TextInput
                            value={fullName}
                            placeholder="example e.g"
                            onChangeText={(e) => setFullName(e)}
                            style={{ paddingLeft: 5, borderWidth: 0.34, borderRadius: 5, }} />
                        <Text style={{ marginBottom: 5 }}>Email</Text>
                        <TextInput
                            value={email}
                            placeholder="john#example.com e.g"
                            onChangeText={(e) => setEmail(e)}
                            style={{ paddingLeft: 5, borderWidth: 0.34, borderRadius: 5, }} />
                        <TouchableOpacity
                            onPress={sumbit}
                            style={{ elevation: 2, backgroundColor: '#E35E1B', borderRadius: 5, padding: 5, marginTop: 10, justifyContent: 'center', height: 50 }}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15, fontWeight: "bold", }}>Submit</Text>
                        </TouchableOpacity>
                        {isError && <Text>{error}</Text>}
                    </View></>}
        </SafeAreaView>
    );
}

export default UserInfoForm;