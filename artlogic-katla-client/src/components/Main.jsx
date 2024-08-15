import React from "react";

function Main() {
    return (
        <div className="jumbotron">
            <h1 className="display-4"><span style={{ color: "blueviolet", fontWeight: "bold", fontFamily: "Arial, Helvetica, sans-serif", marginRight: "0.1em", border: "blueviolet solid 1px", padding: "6px", }}>K</span>KatlaSport</h1>
            <p className="lead">Welcome to KatlaSport management console.</p>
            <hr className="my-4"/>
            <p>Please, click on "API docs" button to get more information about API that back-end provides.</p>
            <a className="btn btn-primary btn-lg" target="_blank" href={process.env.REACT_APP_SERVER_URL + "/api-docs"} role="button">API docs</a>
        </div>

    )
}

export default Main;