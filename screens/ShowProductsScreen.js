import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ServerUrl} from '../App'

let pageNumber;
let itemsPerPage;
let totalPages;

export default class ShowProductsScreen extends React.Component {
    constructor(props) {
        super(props);
        pageNumber = 1;
        itemsPerPage = 5;
        totalPages = 1;
        this.state = {
            productList: 'No products available.'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>All products </Text>
                <Text>
                    {ServerUrl + "/product?pageNumber=" + pageNumber + "&itemsPerPage=" + itemsPerPage}
                </Text>
                <Text ref={div => {this.productsDiv = div;}} id="productsDiv">
                    {this.state.productList}
                </Text>
            </View>
        );
    }

    componentDidMount() {
        let thisVar = this;

        fetch(ServerUrl + "/product?pageNumber=" + pageNumber + "&itemsPerPage=" + itemsPerPage, {
            body: null,
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(function (response) {
                // manipulate response object
                // check status @ response.status etc.
                return response.json(); // parses json
            })
            .then(function (jsonProductsPage) {
                // use parsed result
                pageNumber = jsonProductsPage["pageNumber"];
                totalPages = jsonProductsPage["totalPages"];
                let products = jsonProductsPage["content"];

                for (let i = 0; i < products.length; i++) {
                    let product = products[i];
                    let productDiv = "<Text>" + product["name"] + "    " + product["price"] + "</Text>";
                    thisVar.setState({productList: productDiv});
                }
            });
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
