import React, { Component } from 'react';
import "../../static/css/index.css"

class Index extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="header">
                <div className="bg-overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="jumbotron">
                                    <h1 className="display-4"> Welcome to Hello Books </h1>
                                        <p className="lead">
                                            A library application that allows you to find and rent your favorite books. We are here to help.
                                        </p>
                                        <hr className="my-4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Index;