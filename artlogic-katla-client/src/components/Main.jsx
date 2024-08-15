import React from "react";

function Main() {
    return (
        <div className="jumbotron">
            <h1 className="display-4"><span style={{ color: "blueviolet", fontWeight: "bold", fontFamily: "Arial, Helvetica, sans-serif", marginRight: "0.1em", border: "blueviolet solid 1px", padding: "6px", }}>K</span>KatlaSport</h1>
            <p className="lead">Welcome to KatlaSport management console.</p>
            <hr className="my-4"/>
            <p>Please, click on "Learn more" button to get more information about this project.</p>
            <a className="btn btn-primary btn-lg" target="_blank" href="https://github.com/polovy1o/artlogic-katla" role="button">Learn more</a>
        </div>

    )
}

export default Main;