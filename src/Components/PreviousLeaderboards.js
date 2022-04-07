import React from 'react'

function PreviousLeaderboards(props) {
    const { textColor } = props;
    return (
        <React.Fragment>
            <p className={`w3-large ${textColor}`}><b><i className={`fa fa-asterisk fa-fw w3-margin-right ${textColor}`} />Previous Leaderboards</b></p>
              
              <ul style={{ listStyleType: "none" }}>
                <li key="masters21">
                    <a href="http://masters21.nolan.golf" target="_blank">Masters 2021</a>
                </li>
                <li key="open21">
                    <a href="http://theopen.nolan.golf" target="_blank">The Open 2021</a>
                </li>
              </ul>
        </React.Fragment>
    )
}

export default React.memo(PreviousLeaderboards)