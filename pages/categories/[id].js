import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import Navbar from '../../components/Navbar'
import { GET_PRODUCTS_BY_CATEGORY } from './schema'
import Link from 'next/link'

const CategoryById = () => {
    const router = useRouter()
    const { id } = router.query

    const { loading, data, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: {
            categoryId: id
        }
    })

    if (loading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <Navbar />
            <br /><br /><br />
            <div className='container'>
                <h2>Product by Category</h2>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {data.category.products.items.map((product) => (
                        <div className="col">
                            <Link href={`/product/${product.sku}`} key={product.id}>
                                <div className="card h-100 hoverable">
                                    <img src={product.image.url} className="card-img-top" alt="Skyscrapers" />
                                    <div className='img_description_layer'>
                                        <p className='img_description'><i className="bi bi-eye-fill"></i>&nbsp;Preview</p>
                                    </div>
                                    <div className="card-body bg-dark-card">
                                        <h5 className="card-title">{product.name}</h5>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CategoryById