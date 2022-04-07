import React from 'react'

function Prizes(props) {
    const { sweepstakesData, textColor } = props;
    let prizes = <React.Fragment>
            <p><i className={`fa fa-money fa-fw w3-margin-right w3-large ${textColor}`} />1st Prize: €{Math.ceil((sweepstakesData.length * 2))}</p>
        </React.Fragment>
    return (
        <React.Fragment>
            <p className={`w3-large ${textColor}`}><b><i className={`fa fa-asterisk fa-fw w3-margin-right ${textColor}`} />Sweepstakes Prizes</b></p>
            {prizes}
        </React.Fragment>
    )
}

export default React.memo(Prizes)