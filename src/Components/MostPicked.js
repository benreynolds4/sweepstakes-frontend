import React from 'react'

function MostPicked(props) {
    const { sweepstakesData, groupsData, textColor } = props;
    let mostPicked = getMostPicked(sweepstakesData, groupsData);
    // for each group, iterate through the players and count the number of picks for that player 
    return (
        <React.Fragment>
             <p className={`w3-large ${textColor}`}><b><i className={`fa fa-asterisk fa-fw w3-margin-right ${textColor}`} />Most Picked By Group</b></p>
              
              <ul style={{ listStyleType: "none" }}>
                { mostPicked.map((value, index) => {
                    return <li key={index}>{value.player} ({((value.picks / sweepstakesData.length) * 100).toFixed(0)}%)</li>
                })}
              </ul>
        </React.Fragment>
    )
}

function getMostPicked(sweepstakesData, groupsData) {
    let mostPicked = []
    groupsData.forEach(group => {
        let mostPickedPlayerInGroup = {}
        mostPickedPlayerInGroup['group'] = group.group;
        mostPickedPlayerInGroup['picks'] = 0;
        group.players.forEach(player => {
            let playersPicks = getNumberOfPicks(player, sweepstakesData, group.group);
            if (playersPicks > mostPickedPlayerInGroup['picks']) {
                mostPickedPlayerInGroup['player'] = player;
                mostPickedPlayerInGroup['picks'] = playersPicks
            }
        })
        mostPicked.push(mostPickedPlayerInGroup)
    })
    return mostPicked;
}

function getNumberOfPicks(player, sweepstakesData, group) {
    let count = 0
    sweepstakesData.forEach(sweepstakeEntry => {
        if (sweepstakeEntry[group] === player) {
            count += 1;
        }
    })
    return count;
}

export default React.memo(MostPicked)