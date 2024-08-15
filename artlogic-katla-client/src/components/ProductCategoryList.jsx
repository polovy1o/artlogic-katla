import React from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import productCategoryService from '../services/ProductCategoryService'

export async function ProductCategoryListLoader() {
    const productCategories = (await productCategoryService.getProductCategories()).data;

    if (!productCategories) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found!",
        });
    }
    return { productCategories };
}

function ProductCategoryList() {
    const { productCategories } = useLoaderData()

    return (
        <div className="container">
            <h2>Product Category List</h2>
            <table className="table table-nonfluid">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Products</th>
                    <th scope="col">Last Update</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {productCategories.map(productCategory =>
                        <tr key={productCategory.id}>
                            <th scope="row">{productCategory.id}</th>
                            <td>{productCategory.code}</td>
                            <td>{productCategory.name}</td>
                            <td>{productCategory.productCount}</td>
                            <td>{productCategory.updatedAt}</td>
                            <td>
                                <span className="btn-toolbar" role="toolbar" aria-label="Product category action buttons" style={{ display: "block", whiteSpace: "nowrap", }}>


                                    {productCategory.isDeleted ? 
                                        <div className="btn-group mr-1" role="group" aria-label="Delete group">
                                            <button type="button" className="btn btn-warning">Deleted</button>
                                        </div> 
                                        : null
                                    }
                                    <div className="btn-group mr-1" role="group" aria-label="View group">
                                        <NavLink to={'/category/' + productCategory.id + '/products'} className="btn btn-primary">View products</NavLink>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Edit group">
                                        <NavLink to={'/category/' + productCategory.id} className="btn btn-primary">Edit</NavLink>
                                    </div>
                                </span>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            <div className="btn-toolbar" role="toolbar" aria-label="Action buttons">
                <div className="btn-group" role="group" aria-label="Save group">
                    <NavLink to="/category" className="btn btn-primary">New Product Category</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryList