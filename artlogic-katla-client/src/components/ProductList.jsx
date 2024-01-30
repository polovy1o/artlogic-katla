import React from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import productService from "../services/ProductService";

export async function ProductListLoader() {
    const products = (await productService.getProducts()).data;

    if (!products) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found!",
        });
    }
    return { products };
}

function ProductList() {
    const { products } = useLoaderData();
    
    return (
        <div className="container">
            <h2>Product List</h2>
            <table className="table table-nofluid">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Last Update</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <th scope="row">{product.id}</th>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.categoryCode}</td>
                            <td>{product.updatedAt}</td>
                            <td>
                                <div className="btn-toolbar" role="toolbar" aria-label="Product action buttons">
                                    {product.isDeleted ?
                                        <div className="btn-group mr-1" role="group" aria-label="Delete group">
                                            <button type="button" className="btn btn-warning">Deleted</button>
                                        </div>
                                        : null
                                    }
                                    <div className="btn-group mr-1" role="group" aria-label="View category group">
                                        <NavLink to={'/category/' + product.categoryId + '/products'} className="btn btn-primary">View category products</NavLink>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Edit group">
                                        <NavLink to={'/product/' + product.id} className="btn btn-primary">Edit</NavLink>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    )
}

export default ProductList