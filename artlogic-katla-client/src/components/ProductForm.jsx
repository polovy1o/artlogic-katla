import React, { useState } from "react";
import productService from '../services/ProductService'
import productCategoryService from '../services/ProductCategoryService'
import { useLoaderData, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export async function ProductFormLoader({ params }) {
    const categories = (await productCategoryService.getProductCategories()).data;

    if (params.productId) {
        const product = (await productService.getProduct(params.productId)).data;

        if (!product) {
            throw new Response("", {
                status: 404,
                statusText: "Not Found!",
            });
        }

        return { categories, product };
    }
    return { categories, product: {code: '', categoryId: '', description: '', manufacturerCode: '', price: ''} };
}

function ProductForm() {
    const { categories, product } = useLoaderData()
    const [deleted, setDeleted] = useState(product.isDeleted)
    const navigate = useNavigate();
    const validation = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Product Name must be at least 4 characters long.')
            .max(60, 'Product Name must be less than 60 characters long.')
            .required('Product Name is required.'),
        code: Yup.string()
            .min(5, 'Product Code must be 5 characters long.')
            .max(5, 'Product Code must be 5 characters long.')
            .required('Product Code is required.'),
        manufacturerCode: Yup.string()
            .min(4, 'Manufacturer Code must be at least 4 characters long.')
            .max(10, 'Manufacturer Code must be less than 10 characters long.')
            .required('Manufacturer Code is required.'),
        price: Yup.string()
            .required('Product Price is required.'),
    });

    return (
        <div className="container">
            <h2>Product Editor</h2>
            <Formik
                initialValues={product}
                validationSchema={validation}
                onSubmit={(product) => {
                    if (product.id) {
                        productService.updateProduct(product.id, product).then(() => navigate(-1))
                    } else {
                        productService.addProduct(product).then(() => navigate(-1))
                    }
                }}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        {values.id ?
                            <div className="form-group">
                                <label htmlFor="idLabel">ID</label>
                                <Field type="text" className="form-control" id="id" aria-describedby="idLabel" name="id" readOnly />
                            </div>
                            : null}
                        <div className="form-group">
                            <label htmlFor="name" id="nameLabel">Product Name</label>
                            <Field type="text" className="form-control" id="name" aria-describedby="nameLabel" maxLength="60" name="name" />
                            {errors.name && touched.name ?
                                <div className="alert alert-danger">
                                    <div>{errors.name}</div>
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="code" id="codeLabel">Product Code</label>
                            <Field type="text" className="form-control" id="code" aria-describedby="codeLabel" maxLength="5" name="code" />
                            {errors.code && touched.code ?
                                <div className="alert alert-danger">
                                    <div>{errors.code}</div>
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category" id="categoryLabel">Product Category</label>
                            <Field as='select' name="categoryId" className="custom-select" id="category" aria-describedby="categoryLabel">
                                {categories.filter(({isDeleted}) => !isDeleted).map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" id="descriptionLabel">Product Description</label>
                            <Field as="textarea" value={values.description || ''} className="form-control" id="description" aria-describedby="descriptionLabel" rows="4" maxLength="300" name="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacturerCode" id="manufacturerCodeLabel">Manufacturer Code</label>
                            <Field type="text" value={values.manufacturerCode || ''} className="form-control" id="manufacturerCode" aria-describedby="manufacturerCodeLabel" maxLength="10" name="manufacturerCode" />
                            {errors.manufacturerCode && touched.manufacturerCode ?
                                <div className="alert alert-danger">
                                    <div>{errors.manufacturerCode}</div>
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="price" id="priceLabel">Product Price</label>
                            <Field type="text" className="form-control" id="price" aria-describedby="priceLabel" name="price" />
                            {errors.price && touched.price ?
                                <div className="alert alert-danger">
                                    <div>{errors.price}</div>
                                </div>
                                : null}
                        </div>
                        {values.updatedAt ?
                            <div className="form-group">
                                <label htmlFor="updatedAt">Last Update</label>
                                <Field type="text" className="form-control" id="updatedAt" aria-describedby="updatedAtLabel" required name="updatedAt" readOnly />
                            </div>
                            : null}
                        <div className="btn-toolbar" role="toolbar" aria-label="Action buttons">
                            <div className="btn-group mr-1" role="group" aria-label="Cancel group">
                                <button type="button" onClick={() => navigate(-1)} className="btn btn-primary">Back</button>
                            </div>
                            <div className="btn-group mr-4" role="group" aria-label="Save group">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                            {values.id && !deleted ?
                                <div className="btn-group mr-1" role="group" aria-label="Delete group">
                                    <button type="button" onClick={() => setDeleted(true)} className="btn btn-warning" name="type">Delete</button>
                                </div>
                                : null}
                            {values.id && deleted ?
                                <div className="btn-group" role="group" aria-label="Purge group">
                                    <button type="button" onClick={() => setDeleted(false)} className="btn btn-warning">Undelete</button>
                                    <button type="button" /*onClick={() => productService.deleteProduct(values.id).then(() => navigate(-1)) }*/ className="btn btn-danger">Purge</button>
                                </div>
                                : null}
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProductForm