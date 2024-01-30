import React from "react";
import { useLoaderData } from "react-router-dom";
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
    const { hive } = useLoaderData();

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Hive Name must be at least 4 characters long.')
            .max(60, 'Hive Name must be less than 60 characters long.')
            .required('Product Name is required.')
    });

    return (
        <div className="container">
            <h2>Hive Editor</h2>
            <Formik
                initialValues={hive}
                validationSchema={validation}
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
                        {values.updatedAt ?
                            <div className="form-group">
                                <label htmlFor="updatedAt" id="updatedAtLabel">Last Update</label>
                                <Field type="text" className="form-control" id="updatedAt" aria-describedby="updatedAtLabel" name="updatedAt" readOnly />
                            </div>
                            : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default HiveForm