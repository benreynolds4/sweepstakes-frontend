import React from 'react'

function Raffle(props) {
    const { showRaffle, sweepstakesData, textColor } = props
    if (showRaffle) {
        return (
            <React.Fragment>
                <div className="w3-display-container">
                    <p className={`w3-large ${textColor}`}><b><i className={`fa fa-asterisk fa-fw w3-margin-right ${textColor}`} />#GG4C Raffle</b></p>
                    <img src={'raffle-prize.jpeg'} style={{width: '100%', margin: 'auto'}} alt="Global Golf 4 Cancer Raffle Prize" />
                    <p className="w3-margin">
                        This year, we’re delighted to be  supporting Global Golf 4 Cancer - This time you can enjoy the golf 
                        & the sweep, knowing you'll have played a part in making a difference to a very worthy charity.
                    </p>
                    <p className="w3-margin">
                        In addition to 30% of the sweepstakes pot going to the charity, 100% of the raffle will be too, 
                        so if you haven't already you can enter the raffle for this beautiful framed photograph of the 
                        one and only Seve Ballesteros celebrating his 1984 Open victory, signed by the man who captured it,
                        world famous golf photographer, <a className={`${textColor}`} href="https://twitter.com/Cannonball63?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">
                        David Cannon</a>.  
                    </p>

                    <p><i className={`fa fa-gift fa-fw w3-margin-right w3-large ${textColor}`} />So far you've raised an amazing €{Math.ceil((sweepstakesData.length * 3) + getRaffleAmount(sweepstakesData))}</p>

 
                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        <li><i className={`fa fa-camera-retro fa-fw  w3-large ${textColor}`} /> <a className={`${textColor}`} target="_blank" href="https://form.typeform.com/to/XrKSckkY">Enter Raffle Here</a></li>
                        <li><i className={`fa fa-info fa-fw  w3-large ${textColor}`} />
                            <a className={`${textColor}`} href="https://youtu.be/BQeEkgA_4gM" target="_blank">
                                Find out more about Global Golf 4 Cancer
                            </a>
                        </li>
                    </ul>
                </div>
                
            </React.Fragment>
        )
    } 
    return (<React.Fragment></React.Fragment>)
}

function getRaffleAmount(sweepstakesData) {
    let raffleAmount = 0;
    sweepstakesData.forEach(entry => {
        if (entry.raffle === 5) {
            raffleAmount += 5;
        }
    })
    return raffleAmount;
}

export default React.memo(Raffle)