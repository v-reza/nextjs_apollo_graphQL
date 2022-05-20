import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
    query getCategoryProducts($categoryId: Int!) {
        category(id: $categoryId) {
            id
            name
            url_key
            products{
                items{
                    id
                    name
                    sku
                    image {
                        url
                    }
                }
                total_count
            }
        }
    }
`

export const SUBSCRIBE = gql`
    mutation subscribeInput($input: String!) {
        subscribe(input: {
            email: $input
        }) {
            status {
                code
                message
                response    
            }
        }
    }
`

export const PRODUCT_FILTER_BY_SKU = gql`
    query productFilterBySku($sku: String!) {
        products(filter:{
            sku: {
                eq: $sku
            }
        }) {
            items {
                name
                brand
                qty_available
                description {
                    html 
                }
                image { 
                    url
                }
                price_range {
                    maximum_price {
                        discount {
                          amount_off
                          percent_off
                        }
                        final_price {
                          value
                          currency
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                }
            }
        }
    }
`