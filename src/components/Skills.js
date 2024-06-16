import React, { Component } from "react";

class Skills extends Component {

    renderSkills = (skills, n) => {
        var content=[];
        var a="";
        if (skills) {
           
            content = skills.filter(f => true).slice(n,n + 11).map((skill, index) => {
               return(
                    <li key={index} className="mb-15">
                        <p className="mb-0">{skill.name}</p>
                        <div className="progress plain" style={{width:`${skill.level}%`}} />
                    </li>    
               );
            });
        }
        if(n===22)
            a=`<hr />
            <h3>Certificates</h3>
            <div className="d-flex flex-row justify-content-center align-items-center text-center">
                <img src="/assets/images/azureCertificate.png" width="160px"></img>
            </div>
            `;
        return (
            <div className="col-sm-4">
                <ul className="progress-list">
                    {content}
            
                    
                </ul>
                <div dangerouslySetInnerHTML={{ __html: a }}></div>
            </div>
          );
    };

    render() {
        return (<div className="card">
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
           
                
                <div className="row">
                    {this.renderSkills(this.props.data,0)}
                    {this.renderSkills(this.props.data,11)}
                    {this.renderSkills(this.props.data,22)}
                   
                </div>
                
         
            </div>
            <div className="row">
                
            </div>
            
        </div>
        
        )
    }
}

export default Skills