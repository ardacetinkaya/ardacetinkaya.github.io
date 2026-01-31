import React, { Component } from "react";

class Skills extends Component {

    renderSkillCategory = (category) => {
        if (!category) return null;

        return (
            <div key={category.category} className="skill-category-wrapper">
                <div className="skill-category">
                    <h5 className="post-title h-5">{category.category}</h5>
                    <ul className="progress-list">
                        {category.skills.map((skill, index) => (
                            <li key={index} className="mb-15">
                                <p className="mb-0">{skill.name}</p>
                                <div className="progress plain" style={{width:`${skill.level}%`}} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    renderCertificates = () => {
        return (
            <div className="col-12 mt-4">
                <hr />
                <h3 className="mb-3">Certificates</h3>
                <div className="d-flex flex-row justify-content-center align-items-center text-center">
                    <img src="/assets/images/azureCertificate.png" width="160px" alt="Azure Certificate" />
                </div>
            </div>
        );
    };

    render() {
        const { data } = this.props;
        
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row gx-0">
                        <div className="col-6 col-md-8 col-lg-9">
                            <h2 className="h6">Skills</h2>
                        </div>
                    </div>
                </div>

                <div className="card-body">                    
                    <div className="skills-masonry-container">
                        {data && data.map(category => this.renderSkillCategory(category))}
                    </div>
                    <div className="row">
                        {this.renderCertificates()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Skills;