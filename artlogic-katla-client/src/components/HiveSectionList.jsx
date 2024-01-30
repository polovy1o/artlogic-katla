import React from "react";
import { Form, useLoaderData, NavLink } from "react-router-dom";

export async function HiveSectionListLoader({ params }) {
    return null;
}

function HiveSectionList() {
    return (
        <div className="container">
            <h2>Hive Sections for Hive</h2>
            <table className="table table-nonfluid">
                <thead>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div className="btn-toolbar" role="toolbar" aria-label="Action buttons">
                <div className="btn-group mr-1" role="group" aria-label="Back group">
                    <NavLink to="/hives" className="btn btn-primary">Back</NavLink>
                </div>
                <div className="btn-group" role="group" aria-label="Add group">
                    <NavLink to="/hive/{{this.hiveId}}" className="btn btn-primary">Add hive section</NavLink>
                </div>
            </div>
        </div>

    )
}

export default HiveSectionList