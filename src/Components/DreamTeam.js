import React, { Component } from 'react'


  function DreamTeam(props) {
    const { team, textColor } = props
    if (Object.keys(team).length !== 0) {
        return (
          <React.Fragment>
              <p className={`w3-large ${textColor}`}><b><i className={`fa fa-asterisk fa-fw w3-margin-right ${textColor}`} />The Dream Team</b></p>
              <ul style={{ listStyleType: "none" }}>
                  <li>{team.group_1}</li>
                  <li>{team.group_2}</li>
                  <li>{team.group_4}</li>
                  <li>{team.group_5}</li>
                  <li>Total Score: {team.visual_score}</li>
                </ul>
          </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
        </React.Fragment>
      )
    }
    
}

export default React.memo(DreamTeam)