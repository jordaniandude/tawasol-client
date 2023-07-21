import React from "react"

const BasicInfo = ({profile}) => {
    return (
        <div>
            <div className="container">
                <p>{profile.bio}</p>
            </div>
            <div className="container">
                <p>&#127759; Lives in <b>{profile.location}</b></p>
            </div>
            <div className="container">
                <p>&#127968; From <b>{profile.country}</b></p>
            </div>
            <div className="container">
                <p>
                    {profile.skills.map((skill, index) => (
                        <span key={index}>
                           &#10004; {skill}
                           <br/>
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default BasicInfo