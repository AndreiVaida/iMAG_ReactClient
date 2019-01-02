import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class ProductDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            'product': navigation.getParam('product', null),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text>Product details</Text></View>
                <View>
                    <Text style={styles.titleLeft}>{this.state.product.name}</Text>
                    <Text style={styles.itemLeft}>{this.state.product.price + " lei"}</Text>
                    <Text>{this.state.product.details}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    title: {
        margin: 20,
        alignItems: 'center',
    },
    titleLeft: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemLeft: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 20,
    },
});


