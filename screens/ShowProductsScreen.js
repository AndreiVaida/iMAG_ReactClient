import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ServerUrl} from '../App'
import {List, ListItem} from "react-native-elements";

let pageNumber;
let itemsPerPage;
let totalPages;

export default class ShowProductsScreen extends React.Component {
    constructor(props) {
        super(props);
        pageNumber = 1;
        itemsPerPage = 10;
        totalPages = 1;
        this.state = {
            'productList': [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text>All products</Text></View>

                <ScrollView>
                    <List>
                        {
                            this.state.productList.map((product) => {
                                let details = product.details;
                                if (details != null && details.length > 20) {
                                    details = details.substr(0, 20);
                                }
                                return <ListItem key={product.id} title={product.name} subtitle={details}
                                                 rightTitle={"Preț: " + product.price + " lei"}>ceva</ListItem>
                            })
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        let thisVar = this;

        fetch(ServerUrl + "/product?pageNumber=" + pageNumber + "&itemsPerPage=" + itemsPerPage, {
            body: null,
            headers: {
                'content-type': 'application/json'
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

                thisVar.setState({
                    'productList': productsJson
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
