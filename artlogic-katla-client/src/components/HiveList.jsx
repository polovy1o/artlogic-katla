import React from "react";
import { useLoaderData, NavLink, Form } from "react-router-dom";
import hiveService from "../services/HiveService";

export async function HiveListLoader({ params }) {
    const hives = (await hiveService.getHives()).data;

    if (!hives) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found!",
        });
    }
    return { hives };
}

export async function HiveListAction({ request }) {
    const formData = await request.formData()
    await hiveService.setHiveStatus(formData.get('hiveId'), formData.get('delete'))
    return null;
}

function HiveList() {
    const { hives } = useLoaderData()

    return (
        <div className="container">
            <h2>Hive List</h2>
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
                    {hives.map(hive =>
                        <tr key={hive.id}>
                            <th scope="row">{hive.id}</th>
                            <td>{hive.code}</td>
                            <td>{hive.name}</td>
                            <td>
                                <span className="btn-toolbar" role="toolbar" aria-label="Hive action buttons" style={{ display: "block", whiteSpace: "nowrap", }}>
                                    <Form method="post">
                                        <div className="btn-group mr-1" role="group" aria-label="View group">
                                            <NavLink to={'/hive/' + hive.id + '/sections'} className="btn btn-primary">View sections</NavLink>
                                        </div>
                                        <div className="btn-group mr-2" role="group" aria-label="Edit group">
                                            <NavLink to={'/hive/' + hive.id} className="btn btn-primary">Edit</NavLink>
                                        </div>
                                        <input type="hidden" name="hiveId" value={hive.id} />
                                        {hive.isDeleted ?
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
                <div className="btn-group" role="group" aria-label="New group">
                    <NavLink to="/hive" className="btn btn-primary">New hive</NavLink>
                </div>
            </div>
        </div>


    )
}

export default HiveList