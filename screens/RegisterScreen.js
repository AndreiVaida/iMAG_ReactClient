import React from 'react';
import {Button, StyleSheet, Text, TextInput, View, AsyncStorage} from 'react-native';
import {ServerUrl} from "../App";

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            birthday: '',
            password: '',
            errorMessage: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Creare cont</Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(newEmail) => this.setState({email: newEmail})}
                    placeholder="introdu adresa de e-mail"
                />
                <TextInput
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    onChangeText={(newPassword) => this.setState({password: newPassword})}
                    placeholder="introdu parola"
                />
                <TextInput
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    onChangeText={(newPassword) => this.setState({password: newPassword})}
                    placeholder="introdu parola"
                />

                <View style={{marginTop: 30}}>
                    <Button
                        title="Login"
                        color="#841584"
                        accessibilityLabel="Intră în cont"
                        onPress={() =>
                            this.login(this.state.email, this.state.password)
                        }
                    />
                </View>
                <Text>{this.state.errorMessage}</Text>
            </View>
        );
    }

    login(email, password) {
        let thisVar = this;

        const body = {
            'email': email,
            'password': password,
        };

        fetch(ServerUrl + "/user/login", {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        })
            .then(function (response) {
                if (!response.ok) {
                    throw response;
                }
                response.json().then(jsonResponse => {
                    const userId = jsonResponse["userId"];
                    const token = jsonResponse["token"];
                    // save in local storage
                    let _storeData = async () => {
                        try {
                            console.log("1");
                            await AsyncStorage.setItem('userId', userId, (err) => {console.log(err)});
                            console.log("2");
                            await AsyncStorage.setItem('token', 'token');
                        } catch (error) {
                            console.log("Something went wrong.");
                            throw "Something went wrong.";
                        }
                        console.log("SAVED");
                    };
                });

                let userId = null;
                let token = null;
                let _retrieveData = async () => {
                    console.log("3");
                    try {
                        await AsyncStorage.getItem('userId').then((value) => {
                            console.log("4");
                            userId=JSON.parse(value);
                            console.log("Merge");
                            console.log(userId);
                        }).done();
                        console.log("5");

                        await AsyncStorage.getItem('token');
                        console.log("id 1: " + userId);
                        console.log("token 1:" + token);

                        if (userId == null || token == null) {
                            console.log("ERROR NULL");
                            thisVar.props.navigation.navigate('LoginScreen');
                        }
                    } catch (error) {
                        console.log("ERROR err: " + error);
                        thisVar.props.navigation.navigate('LoginScreen');
                    }
                };
                console.log("6");
                //thisVar.props.navigation.navigate('WishlistScreen');
            })
            .catch(err => {
                console.log("catch: " + err);
                if (err === "Something went wrong.") {
                    thisVar.setState({errorMessage: "Eroare la login. Șterge datele aplicației și încearcă din nou."})
                }
                else {
                    thisVar.setState({errorMessage: "E-mail sau parolă greșită."})
                }
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        height: 40,
        width: 300,
        margin: 5,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
});
