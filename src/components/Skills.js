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
                    {/* <div className="d-flex flex-row justify-content-between align-items-center">
                        <img src="assets/images/dotnet.png" width="50px" alt="" className="align-self-center"></img>
                        <img src="assets/images/azure.png" width="50px" alt="" className="align-self-center"></img>
                        <img src="assets/images/csharp.png" width="35px" alt="" className="align-self-center"></img>
                        <img src="assets/images/docker.png" width="40px" alt="" className="align-self-center"></img>
                        <img src="assets/images/kubernetes.png" width="70px" alt="" className="align-self-center"></img>
                        <img src="assets/images/microservices.png" width="90px" alt="" className="align-self-center"></img>
                        <img src="assets/images/azureDevops.png" width="90px" alt="" className="align-self-center"></img>
                        <img src="assets/images/openshift.png" width="50px" alt="" className="align-self-center"></img>
                        <img src="assets/images/sql.png" width="60px" alt="" className="align-self-center"></img>
                        <img src="assets/images/rabbitmq.png" width="60px" alt="" className="align-self-center"></img>
                        <img src="assets/images/terraform.png" width="60px" alt="" className="align-self-center"></img>
                    </div>
                    <hr></hr> */}
                    
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