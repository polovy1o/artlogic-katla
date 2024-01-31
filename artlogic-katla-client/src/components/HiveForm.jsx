import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import hiveService from "../services/HiveService";

export async function HiveFormLoader({ params }) {
    if (params.hiveId) {
        const hive = (await hiveService.getHive(params.hiveId)).data;

        if (!hive) {
            throw new Response("", {
                status: 404,
                statusText: "Not Found!",
            });
        }

        return { hive };
    }
    return { hive: { name: '' } };
}

function HiveForm() {
    const navigate = useNavigate()
    const { hive } = useLoaderData();
    const [deleted, setDeleted] = useState(hive.isDeleted)

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Hive Name must be at least 4 characters long.')
            .max(60, 'Hive Name must be less than 60 characters long.')
            .required('Product Name is required.'),
        code: Yup.string()
            .min(5, 'Hive Code must be 5 characters long.')
            .max(5, 'Hive Code must be 5 characters long.')
            .required('Hive Code is required.')
    });

    return (
        <div className="container">
            <h2>Hive Editor</h2>
            <Formik
                initialValues={hive}
                validationSchema={validation}
                onSubmit={(hive) => {
                    if (hive.id) {
                        hiveService.updateHive(hive.id, hive).then(() => navigate(-1))
                    } else {
                        hiveService.addHive(hive).then(() => navigate(-1))
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
                            <label htmlFor="name" id="nameLabel">Hive Name</label>
                            <Field type="text" className="form-control" id="name" aria-describedby="nameLabel" maxLength="60" name="name" />
                            {errors.name && touched.name ?
                                <div className="alert alert-danger">
                                    <div>{errors.name}</div>
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="code" id="codeLabel">Hive Code</label>
                            <Field type="text" className="form-control" id="code" aria-describedby="codeLabel" name="code" maxLength="5" />
                            {errors.code && touched.code ?
                                <div className="alert alert-danger">
                                    {errors.code}
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" id="descriptionLabel">Hive Address</label>
                            <Field as='textarea' value={values.address || ''} className="form-control" id="address" aria-describedby="addressLabel" rows="4" maxLength="300" name="address" />
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
                                    <button type="button" onClick={() => hiveService.setHiveStatus(values.id, true).then(() => setDeleted(true))} className="btn btn-warning" name="type">Delete</button>
                                </div>
                                : null}
                            {values.id && deleted ?
                                <div className="btn-group" role="group" aria-label="Purge group">
                                    <button type="button" onClick={() => hiveService.setHiveStatus(values.id, false).then(() => setDeleted(false))} className="btn btn-warning">Undelete</button>
                                    <button type="button" onClick={() => hiveService.deleteHive(values.id).then(() => navigate(-1))} className="btn btn-danger">Purge</button>
                                </div>
                                : null}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default HiveForm