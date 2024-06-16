import React, { Component } from "react";



class Experience extends Component {

    renderExperiences = (experiences) => {
        var content="";
        if (experiences) {
            content = experiences.filter(f => true).map((experience, index) => {
                return (
                    <div key={index} className="item col-md-6">
                        <div className="brand">
                            <figure><img src={experience.logo} alt={experience.name} /></figure>
                        </div>
                        <p>
                            <div className="d-flex flex-row">
                                <div className="mr-auto">
                                    <strong><a href={experience.url} target="_blank" rel="noopener noreferrer">{experience.name}</a></strong><span className="small text-muted lh-lg mb-0"> @ {experience.location}</span>
                                    <p className="small text-muted lh-lg">{experience.title}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content">
                                <p className="small  lh-lg" dangerouslySetInnerHTML={{ __html: experience.description }}></p>
                            </div>
                        </p>
                    </div>)
            });
        } 
        return content;
    }


    render() {
        return (<div className="card">
            <div className="card-header">
                <div className="row gx-0">
                    <div className="col-md-8 col-lg-9">
                        <h2 className="h6">Some highlights within my professional experiences</h2>
                    </div>
                </div>
            </div>
            <div className="card-body grid grid-view">
                <div className="row gx-md-25 gy-15 isotope mt-0">
                    {this.renderExperiences(this.props.data)}
                </div>

                <div className="row gx-md-25 gy-15 isotope text-right mr-5 mt-5">
                    <a className="btn text-right pr-5" href={this.props.url} target="_blank" rel="noopener noreferrer">All experiences</a>
                </div>
            </div>
        </div>);
    }
}

export default Experience;