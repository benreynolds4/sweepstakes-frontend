import React from 'react'

function PlayerName(props) {
    const { player, liveScores } = props;
    let position = "";
    if (liveScores !== undefined && player !== undefined) {
        position = getPlayerPosition(player, liveScores);
    }
    return (
        <React.Fragment>
            {player} ({position})
        </React.Fragment>
    )
}

function getPlayerPosition(player, liveScores) {
    player = liveScores.find(score => score.player.toLowerCase() == player.toLowerCase());
    if (player !== undefined) {
        return player.position;
    }
    else {
        console.log("No Player");
    }
    return 'Not Found';
}

export default React.memo(PlayerName)