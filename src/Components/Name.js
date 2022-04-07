import React from 'react'

function Name(props) {
    const { row } = props;
    let raffle;
    if (row.raffle === 5 ) {
        raffle =  <img src={'globalgolf4cancer.jpeg'} style={{width: '20px', margin: 'auto'}} alt="Global Golf 4 Cancer Raffle Prize" />

    }
    return (
        <React.Fragment>
            {row.Initials} {raffle}
        </React.Fragment>
    )
}

export default React.memo(Name)