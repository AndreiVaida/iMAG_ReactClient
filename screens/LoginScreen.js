import React from 'react';
import {AsyncStorage, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {ServerUrl} from "../App";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.stayLeft}>
                    <Text>Login</Text>
                </View>
                <Text>E-mail:</Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(newEmail) => this.setState({email: newEmail})}
                    placeholder="introdu adresa de e-mail"
                />
                <Text>Parola:</Text>
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
                response.json().then(async jsonResponse => {
                    const userId = jsonResponse["userId"];
                    const token = jsonResponse["token"];
                    // save in local storage
                    try {
                        await AsyncStorage.setItem('userId', userId.toString());
                        await AsyncStorage.setItem('token', token.toString());
                    } catch (error) {
                        console.log("error at save: " + error);
                    }
                });
                // go to login screen
                thisVar.props.navigation.navigate('WishlistScreen');
            })
            .catch(err => {
                if (err === "Something went wrong.") {
                    thisVar.setState({errorMessage: "Eroare la login. Șterge datele aplicației și încearcă din nou."})
                } else {
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
    stayLeft: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
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
