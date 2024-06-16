import React, { Component } from "react";

class Contact extends Component {
    render() {
        return (<div className="card">
            <div className="card-header">
                <div className="row gx-0">
                    <div className="col-6 col-md-8 col-lg-9">
                        <h2 className="h6">Contact</h2>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="bio-tab" data-toggle="tab" href="#bio" role="tab" aria-controls="bio" aria-selected="true"> </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="bio" role="tabpanel" aria-labelledby="bio-tab">
                        <div className="d-flex flex-row justify-content-between align-items-center float-left">
                            You can directly reach me from following e-mail address; <br />
                            <img src="/assets/images/email.png" className="brand-img" alt="No Spam"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Contact