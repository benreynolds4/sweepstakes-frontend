import React from 'react'

function Prizes(props) {
    const { sweepstakesData, textColor } = props;
    let prizes = <React.Fragment>
            <p><i className={`fa fa-money fa-fw w3-margin-right w3-large ${textColor}`} />1st Prize: €{Math.ceil((sweepstakesData.length * 10) * .6)}</p>
            <p><i className={`fa fa-money fa-fw w3-margin-right w3-large ${textColor}`} />2nd Prize: €{Math.ceil((sweepstakesData.length * 10) * .10)}</p>
            <p><i className={`fa fa-money fa-fw w3-margin-right w3-large ${textColor}`} />3nd Prize: €{Math.ceil((sweepstakesData.length * 10) * .08)}</p>
            <p><i className={`fa fa-money fa-fw w3-margin-right w3-large ${textColor}`} />4th Prize: €{Math.ceil((sweepstakesData.length * 10) * .06)}</p>
            <p><i className={`fa fa-money fa-fw w3-margin-right w3-large ${textColor}`} />5th Prize: €{Math.ceil((sweepstakesData.length * 10) * .03)}</p>
        </React.Fragment>
    return (
        <React.Fragment>
            <p className={`w3-large ${textColor}`}><b><i className={`fa fa-asterisk fa-fw w3-margin-right ${textColor}`} />Sweepstakes Prizes</b></p>
            {prizes}
        </React.Fragment>
    )
}

export default React.memo(Prizes)