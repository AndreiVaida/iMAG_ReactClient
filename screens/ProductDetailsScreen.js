import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


export default class ProductDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            'product': navigation.getParam('product', null),
        };
    }

    render() {
        const product = this.state.product;
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text>Product details</Text></View>
                <View>
                    <Image
                        style={styles.image}
                        source={{uri: 'data:image/png;base64,' + product.image}}
                    />
                    <Text style={styles.titleLeft}>{product.name}</Text>
                    <Text style={styles.itemLeft}>{product.price + " lei"}</Text>
                </View>
                <View>
                    <Text>{product.details}</Text>
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
    image: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 100,
        height: 120,
    },
    titleLeft: {
        position: 'absolute',
        left: 120,
        top: 0,
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


