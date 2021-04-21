import React, { Component } from 'react'


  function DreamTeam(props) {
    const { team } = props
    console.log(team)
    return (
        <React.Fragment>
            <ul style={{ listStyleType: "none" }}>
                <li>{team.group_1}</li>
                <li>{team.group_2}</li>
                <li>{team.group_3}</li>
                <li>{team.group_4}</li>
                <li>{team.group_5}</li>
                <li>Total Score: {team.visual_score}</li>
              </ul>
        </React.Fragment>
    )
}

export default React.memo(DreamTeam)