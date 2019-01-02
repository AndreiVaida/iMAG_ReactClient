import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ServerUrl} from '../App'
import {List, ListItem} from "react-native-elements";

let pageNumber;
let itemsPerPage;
let totalPages;

export default class ProductsListScreen extends React.Component {
    constructor(props) {
        super(props);
        pageNumber = 1;
        itemsPerPage = 11;
        totalPages = 1;
        this.state = {
            'productList': [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text>All products</Text></View>

                <ScrollView
                    onScroll={({nativeEvent}) => {
                        this.loadProductsIfNeeded(nativeEvent);
                    }}>
                    <List>
                        {
                            this.state.productList.map((product) => {
                                let details = product.details;
                                if (details != null && details.length > 20) {
                                    details = details.substr(0, 20);
                                }
                                return <ListItem key={product.id} title={product.name} subtitle={details} rightTitle={"Preț: " + product.price + " lei"}
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

    loadProductsIfNeeded(nativeEvent) {
        if (this.isCloseToBottom(nativeEvent)) {
            if (pageNumber < totalPages) {
                pageNumber++;
                this.loadProducts()
            }
        }
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 50;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        let thisVar = this;

        fetch(ServerUrl + "/product?pageNumber=" + pageNumber + "&itemsPerPage=" + itemsPerPage, {
            body: null,
            headers: {
                'content-type': 'application/json',
            },
            method: 'GET',
        })
            .then(function (response) {
                // TODO: check status @ response.status etc.
                return response.json();
            })
            .then(function (jsonProductsPage) {
                pageNumber = jsonProductsPage["pageNumber"];
                totalPages = jsonProductsPage["totalPages"];
                let productsJson = jsonProductsPage["content"];

                let newProductList = thisVar.state.productList.slice();
                for (let i = 0; i < productsJson.length; i++) {
                    newProductList.push(productsJson[i]);
                }
                thisVar.setState({
                    'productList': newProductList
                });
            });
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


