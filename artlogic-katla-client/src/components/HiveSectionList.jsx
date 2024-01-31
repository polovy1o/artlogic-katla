import React from "react";
import { Form, useLoaderData, NavLink } from "react-router-dom";
import hiveService from "../services/HiveService";
import hiveSectionService from "../services/HiveSectionService";

export async function HiveSectionListLoader({ params }) {
    const sections = (await hiveService.getHiveSections(params.hiveId)).data;

    if (!sections) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found!",
        });
    }
    return { sections, hiveId: params.hiveId };
}

export async function HiveSectionListAction({ request }) {
    const formData = await request.formData()
    await hiveSectionService.setHiveSectionStatus(formData.get('sectionId'), formData.get('delete'))
    return null;
}

function HiveSectionList() {
    const { sections, hiveId } = useLoaderData()

    return (
        <div className="container">
            <h2>Hive Sections for Hive #{hiveId}</h2>
            <table className="table table-nonfluid">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map(section =>
                        <tr key={section.id}>
                            <th scope="row">{section.id}</th>
                            <td>{section.code}</td>
                            <td>{section.name}</td>
                            <td>
                                <span className="btn-toolbar" role="toolbar" aria-label="Hive Section action buttons" style={{ display: "block", whiteSpace: "nowrap", }}>
                                    <Form method="post">
                                        <div className="btn-group mr-2" role="group" aria-label="Edit group">
                                            <NavLink to={'/section/' + section.id} className="btn btn-primary">Edit</NavLink>
                                        </div>
                                        <input type="hidden" name="sectionId" value={section.id} />
                                        {section.isDeleted ?
                                            <div className="btn-group" role="group" aria-label="Undelete group">
                                                <button type="submit" name="delete" value={false} className="btn btn-warning">Undelete</button>
                                            </div>
                                            :
                                            <div className="btn-group" role="group" aria-label="Delete group">
                                                <button type="submit" name="delete" value={true} className="btn btn-danger">Delete</button>
                                            </div>
                                        }
                                    </Form>
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="btn-toolbar" role="toolbar" aria-label="Action buttons">
                <div className="btn-group mr-1" role="group" aria-label="Back group">
                    <NavLink to="/hives" className="btn btn-primary">Back</NavLink>
                </div>
                <div className="btn-group" role="group" aria-label="Add group">
                    <NavLink to={'/hive/' + hiveId + '/section'} className="btn btn-primary">Add hive section</NavLink>
                </div>
            </div>
        </div>

    )
}

export default HiveSectionList