import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to iMAG !</Text>

                <Button
                    title="Vezi toate produsele"
                    color="#841584"
                    accessibilityLabel="See all products"
                    onPress={() =>
                        this.props.navigation.navigate('ProductsListScreen')
                    }
                />
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
});
