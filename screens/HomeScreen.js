import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to iMAG !</Text>

                <View style={styles.buttonView}>
                    <Button
                        title="Vezi toate produsele"
                        accessibilityLabel="See all products"
                        color="#841584"
                        margin="20"
                        onPress={() =>
                            this.props.navigation.navigate('ProductsListScreen')
                        }
                    />
                </View>
                <View>
                    <Button
                        title="Login"
                        color="#841584"
                        margin="20"
                        accessibilityLabel="Intră în cont"
                        onPress={() =>
                            this.props.navigation.navigate('LoginScreen')
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        margin: 20,
    }
});
