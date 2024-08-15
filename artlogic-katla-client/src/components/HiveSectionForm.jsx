import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import hiveSectionService from "../services/HiveSectionService";

export async function HiveSectionFormLoader({params})
{
    if (params.sectionId) {
        const section = (await hiveSectionService.getHiveSection(params.sectionId)).data;

        if (!section) {
            throw new Response("", {
                status: 404,
                statusText: "Not Found!",
            });
        }

        return { section };
    }
    return { section: { name: '', code: '', hiveId: params.hiveId } };
}

function HiveSectionForm()
{
    const navigate = useNavigate()
    const { section } = useLoaderData();
    console.log(section)
    const [deleted, setDeleted] = useState(section.isDeleted)

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Section Name must be at least 4 characters long.')
            .max(60, 'Section Name must be less than 60 characters long.')
            .required('Section Name is required.'),
        code: Yup.string()
            .min(5, 'Section Code must be 5 characters long.')
            .max(5, 'Section Code must be 5 characters long.')
            .required('Section Code is required.')
    });

    return (
        <div className="container">
            <h2>Hive Section Editor</h2>
            <Formik
                initialValues={section}
                validationSchema={validation}
                onSubmit={(section) => {
                    if (section.id) {
                        hiveSectionService.updateHiveSection(section.id, section).then(() => navigate(-1))
                    } else {
                        hiveSectionService.addHiveSection(section).then(() => navigate(-1))
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
                        {values.hiveId ?
                            <div className="form-group">
                                <label htmlFor="idLabel">Hive ID</label>
                                <Field type="text" className="form-control" id="hiveId" aria-describedby="idLabel" name="hiveId" readOnly />
                            </div>
                            : null}
                        <div className="form-group">
                            <label htmlFor="name" id="nameLabel">Section Name</label>
                            <Field type="text" className="form-control" id="name" aria-describedby="nameLabel" maxLength="60" name="name" />
                            {errors.name && touched.name ?
                                <div className="alert alert-danger">
                                    <div>{errors.name}</div>
                                </div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="code" id="codeLabel">Section Code</label>
                            <Field type="text" className="form-control" id="code" aria-describedby="codeLabel" name="code" maxLength="5" />
                            {errors.code && touched.code ?
                                <div className="alert alert-danger">
                                    {errors.code}
                                </div>
                                : null}
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
                                    <button type="button" onClick={() => hiveSectionService.setHiveSectionStatus(values.id, true).then(() => setDeleted(true))} className="btn btn-warning" name="type">Delete</button>
                                </div>
                                : null}
                            {values.id && deleted ?
                                <div className="btn-group" role="group" aria-label="Purge group">
                                    <button type="button" onClick={() => hiveSectionService.setHiveSectionStatus(values.id, false).then(() => setDeleted(false))} className="btn btn-warning">Undelete</button>
                                    <button type="button" onClick={() => hiveSectionService.setHiveSectionStatus(values.id).then(() => navigate(-1))} className="btn btn-danger">Purge</button>
                                </div>
                                : null}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default HiveSectionForm