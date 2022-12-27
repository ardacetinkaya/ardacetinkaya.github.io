import React, { Component } from "react";

class About extends Component {
    render() {
        const me = this.props.me;
        const education = this.props.education;
        const other = this.props.other;
        const work = this.props.work;
        return (<div className="card">
            <div className="card-header">
                <div className="row gx-0">
                    <div className="col-6 col-md-8 col-lg-9">
                        <h2 className="h6">About me</h2>
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
                        <p style={{whiteSpace: "pre-line"}} dangerouslySetInnerHTML={{ __html: me }}></p>
                        <hr></hr>
                        <p style={{whiteSpace: "pre-line"}} dangerouslySetInnerHTML={{ __html: work }}></p>
                        <hr></hr>
                        <p style={{whiteSpace: "pre-line"}} dangerouslySetInnerHTML={{ __html: education }}></p>
                        <p style={{whiteSpace: "pre-line"}} dangerouslySetInnerHTML={{ __html: other }}></p>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default About