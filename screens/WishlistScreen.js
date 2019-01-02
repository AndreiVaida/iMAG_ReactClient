import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ServerUrl} from '../App'
import {List, ListItem} from "react-native-elements";


export default class WishlistScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'productList': [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text>Wishlist</Text></View>

                <ScrollView>
                    <List>
                        {
                            this.state.productList.map((product) => {
                                let details = product.details;
                                if (details != null && details.length > 20) {
                                    details = details.substr(0, 20);
                                }
                                return <ListItem key={product.id} title={product.name} subtitle={details}
                                                 rightTitle={"Preț: " + product.price + " lei"}
                                                 onPress={() =>
                                                     this.props.navigation.navigate('ProductDetailsScreen', {product: product})
                                                 }/>
                            })
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        this.loadWishlist();
    }

    loadWishlist() {
        let startLoadingWishlist = async () => {
            let thisVar = this;
            let userId = null;
            let token = null;

            try {
                userId = await AsyncStorage.getItem('userId');
                token = await AsyncStorage.getItem('token');

                if (userId == null || token == null) {
                    thisVar.props.navigation.navigate('LoginScreen');
                }
            } catch (error) {
                thisVar.props.navigation.navigate('LoginScreen');
            }

            fetch(ServerUrl + "/user/wishlist", {
                body: null,
                headers: {
                    'content-type': 'application/json',
                    'userId': userId,
                    'token': token,
                },
                method: 'GET',
            })
                .then(function (response) {
                    if (!response.ok) {
                        thisVar.props.navigation.navigate('LoginScreen');
                        return Promise.reject("Failed to load wishlist.");
                    }
                    return response.json();
                })
                .then(function (jsonProductsPage) {
                    let productsJson = jsonProductsPage["productDtos"];
                    thisVar.setState({
                        'productList': productsJson
                    });
                });

        };
        startLoadingWishlist();
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
});


