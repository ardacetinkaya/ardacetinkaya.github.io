import React, { Component } from "react";

class Social extends Component {
    render() {
        const socialAddresses = this.props.data;
        if(socialAddresses)
        return (
            <ul className="social social-mute text-right">
                
                {socialAddresses?.map((address, index) => {
                    return (<li key={index} ><a href={address.value} target="_blank" rel="noreferrer" ><i class={address.icon}></i></a></li>)
                })}


            </ul>)
    }
}

export default Social;