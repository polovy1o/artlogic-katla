import React from "react";
import productService from "../services/ProductService";
import { useLoaderData, NavLink } from "react-router-dom";

export async function ProductCategoryProductListLoader({ params }) {
    const categoryProducts = (await productService.getCategoryProducts(params.categoryId)).data;

    if (!categoryProducts) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found!",
        });
    }
    return { categoryProducts, categoryId: params.categoryId };
}

function ProductCategoryProductList() {
    const { categoryProducts, categoryId } = useLoaderData()

    return (
        <div className="container">
            <h2>Products for Category</h2>
            <table className="table table-nonfluid">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last Update</th>
                    <th scope="col"></th>
                </thead>
                <tbody>
                    {categoryProducts.map(product =>
                        <tr>
                            <th scope="row">{product.id}</th>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.updatedAt}</td>
                            <td>
                                <span className="btn-toolbar" role="toolbar" aria-label="Product category action buttons" style={{ display: "block", whiteSpace: "nowrap", }}>
                                    {product.isDeleted ?
                                        <div className="btn-group mr-1" role="group" aria-label="Delete product" >
                                            <button type="button" className="btn btn-danger">Deleted</button>
                                        </div>
                                        : null}
                                    <div className="btn-group" role="group" aria-label="Edit product">
                                        <NavLink to={'/category/' + categoryId + '/product/' + product.id} className="btn btn-primary">Edit</NavLink>
                                    </div>
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table >
            <div className="btn-toolbar" role="toolbar" aria-label="Action buttons">
                <div className="btn-group" role="group" aria-label="Back group">
                    <NavLink to="/categories" className="btn btn-primary">View categories</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryProductList;