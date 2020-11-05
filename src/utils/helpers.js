import firestore from '@react-native-firebase/firestore';

let helpers = {};

helpers.getDataOnces = async function (collectionName) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .get();
        return response.docs
    } catch (error) {
        return error
    }
}

helpers.getDataOncesWithId = async function (collectionName, docId) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .doc(docId)
            .get();
        return response.docs
    } catch (error) {
        return error
    }
}

helpers.InsertDataWithOutId = async function (collectionName, data) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .add(data)
        return response.docs
    } catch (error) {
        return error
    }
}

helpers.InsertDataWithId = async function (collectionName, id, data) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .doc(id)
            .set(data)
        return response.docs
    } catch (error) {
        return error
    }
}


helpers.UdpateDoc = async function (collectionName, id, data) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .doc(id)
            .update(data)
        return response
    } catch (error) {
        return error
    }
}

helpers.DeleteDoc = async function (collectionName, id, data) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .doc(id)
            .delete()
        return response
    } catch (error) {
        return error
    }
}

helpers.UploadContacts = async function (collectionName, data) {
    try {
        const response = await firestore()
            .collection(collectionName)
            .add({ ...data })
        return response
    } catch (error) {
        return error
    }
}


helpers.registration = async function (collectionName, data) {
    try {
        let userRegistrationResponse;
        const response = await firestore()
            .collection(collectionName)
            .where('email', '==', data.email.toLowerCase())
            .get()
        if (response.docs.length == 0) {
            await firestore()
                .collection('Users')
                .add({
                    fullName: data.fullName,
                    email: data.email.toLowerCase(),
                })
                .then(async (data) => {
                    userRegistrationResponse = await firestore()
                        .collection('Users')
                        .doc(data.id)
                        .get()
                })
            return { status: 200, data: userRegistrationResponse }
        } else {
            return { status: 400, message: "User already exist" }
        }
        // return response
    } catch (error) {
        return error
    }
}



export default helpers