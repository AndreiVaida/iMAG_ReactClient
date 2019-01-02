import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ServerUrl} from '../App'
import {List, ListItem} from "react-native-elements";


export default class WishlistScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'productList': [],
            'message': " ",
            'messageColor': "black"
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>Wishlist</Text>
                    <Text>Apasă lung pe un produs pentru a-l elimina.</Text>
                    <Text style={{color: this.state.messageColor}}>{this.state.message}</Text>
                </View>

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
                                                 }
                                                 onLongPress={() =>
                                                     this.removeProductFromWishlist(product.id)
                                                 }/>
                            })
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

    removeProductFromWishlist(productId) {
        let start = async () => {
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
                    'token': token,
                    'userId': userId,
                    'productId': productId,
                },
                method: 'DELETE',
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw response;
                    }
                    // show success on the screen
                    thisVar.setState({message: "Eliminat din wishlist"});
                    thisVar.setState({messageColor: "#066d1c"});
                    thisVar.loadWishlist();
                })
                .catch(err => {
                    console.log(err.toString());
                    thisVar.setState({wishlistButtonText: "Nu s-a eliminat din wishlist"});
                    thisVar.setState({messageColor: "#6d0606"});
                })
        };
        start();
    }

    componentDidMount() {
        this.loadWishlist();
    }

    loadWishlist() {
        let start = async () => {
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
        start();
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


