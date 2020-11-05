import React, { useState } from 'react';
import { View, SafeAreaView, Text, Dimensions, PermissionsAndroid, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import Contacts from 'react-native-contacts';
import helpers from '../../utils/helpers';
const { width, height } = Dimensions.get('window')


function UploadContacts(props) {
    const [contacts, setContacts] = useState([])
    const [isLoading, setIsloading] = useState(false);
    const [userId] = useState(props.userId)



    function fetchContacts() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        ).then(
            Contacts.getAll().then(contacts => {
                setIsloading(true)
                setContacts(contacts)
                setIsloading(false)
            })
        )
    }

    async function uploadContacts() {
        try {
            const body = {
                userId: props.userId,
                contactName: contacts[0].givenName.toUpperCase(),
                contactNumber: contacts[0].phoneNumbers.length > 0 ? contacts[0].phoneNumbers[0].number : 'null',
            }
            const response = await helpers.UploadContacts('Contacts', body);
            console.log(response)
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 5 }}>
            {isLoading && <View style={{ justifyContent: 'center', height: height - 30, position: 'absolute', width: width }}>
                <ActivityIndicator color="red" size={30} />
            </View>}
            <TouchableOpacity
                onPress={contacts.length > 0 ? uploadContacts : fetchContacts}
                style={{ backgroundColor: '#E35E1B', elevation: 2, borderRadius: 5, padding: 5, marginTop: 10, justifyContent: 'center', height: 50 }}>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15, fontWeight: "bold", }}>{contacts.length > 0 ? 'Upload Contacts' : 'Fetch Contacts'}</Text>
            </TouchableOpacity>
            {/* { isLoading && <View style={{ borderWidth: 1 }}>
                <ActivityIndicator color='red' />
            </View>} */}
            <ScrollView>
                {contacts.length > 0 && contacts.map((item, index) => {
                    return (
                        <View key={index} style={{ borderWidth: 0.34, borderRadius: 5, padding: 5, margin: 5, flexDirection: 'column' }}>
                            <View style={{}}>
                                <Text>{item.givenName.toUpperCase()} : </Text>
                                <Text>{item.phoneNumbers.length > 0 && item.phoneNumbers[0].number} </Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export default UploadContacts;