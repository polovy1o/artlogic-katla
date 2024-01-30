import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import productCategoryService from "../services/ProductCategoryService";

export async function ProductCategoryFormLoader({ params }) {
    if (params.categoryId) {
        const category = (await productCategoryService.getProductCategory(params.categoryId)).data;

        if (!category) {
            throw new Response("", {
                status: 404,
                statusText: "Not Found!",
            });
        }

        return { category };
    }
    return { category: { name: '', code: '', description: '' } };
}


function ProductCategoryForm() {
    const navigate = useNavigate()
    const { category } = useLoaderData();
    const [deleted, setDeleted] = useState(category.isDeleted)
    const validation = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Product Category Name must be at least 4 characters long.')
            .max(60, 'Product Category Name must be less than 60 characters long.')
            .required('Product Category Name is required.'),
        code: Yup.string()
            .min(5, 'Product Category Code must be 5 characters long.')
            .max(5, 'Product Category Code must be 5 characters long.')
            .required('Product Category Code is required.')
    });

    return (
        <div className="container">
            <h2>Product Category Editor</h2>
            <Formik
                initialValues={category}
                validationSchema={validation}
                onSubmit={(category) => {
                    if (category.id) {
                        productCategoryService.updateProductCategory(category.id, category).then(() => navigate(-1))
                    } else {
                        productCategoryService.addProductCategory(category).then(() => navigate(-1))
                    }
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        {values.id ?
                            <div className="form-group">
                                <label htmlFor="idLabel">ID</label>
                                <Field type="text" className="form-control" id="id" aria-describedby="idLabel" name="id" readOnly />
                            </div>
                            : null}
                        <div className="form-group">
                            <label htmlFor="name" id="nameLabel">Product Category Name</label>
                            <Field type="text" className="form-control" id="name" aria-describedby="nameLabel" name="name" maxLength="60" />
                            {errors.name && touched.name ?
                                <div className="alert alert-danger">
                                    {errors.name}
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="code" id="codeLabel">Product Category Code</label>
                            <Field type="text" className="form-control" id="code" aria-describedby="codeLabel" name="code" maxLength="60" />
                            {errors.code && touched.code ?
                                <div className="alert alert-danger">
                                    {errors.code}
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" id="descriptionLabel">Product Category Description</label>
                            <Field as='textarea' value={values.description || ''} className="form-control" id="description" aria-describedby="descriptionLabel" rows="4" maxLength="300" name="description" />
                        </div>
                        {values.updatedAt ?
                            <div className="form-group">
                                <label htmlFor="updatedAt" id="updatedAtLabel">Last Update</label>
                                <Field type="text" className="form-control" id="updatedAt" aria-describedby="updatedAtLabel" name="updatedAt" readOnly />
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
                                    <button type="button" onClick={() => productCategoryService.setProductCategoryStatus(values.id, true).then(() => setDeleted(true))} className="btn btn-warning" name="type">Delete</button>
                                </div>
                                : null}
                            {values.id && deleted ?
                                <div className="btn-group" role="group" aria-label="Purge group">
                                    <button type="button" onClick={() => productCategoryService.setProductCategoryStatus(values.id, false).then(() => setDeleted(false))} className="btn btn-warning">Undelete</button>
                                    <button type="button" onClick={() => productCategoryService.deleteProductCategory(values.id).then(() => navigate(-1))} className="btn btn-danger">Purge</button>
                                </div>
                                : null}
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default ProductCategoryForm