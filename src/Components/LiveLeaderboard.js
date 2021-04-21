import React, { Component } from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: '#',
        selector: row => row.position,
        grow: 0,
    },
    {
        name: 'Player',
        selector: row => row.player,
    },
    {
        name: 'Total',
        selector: row => row.today,
        grow: 0,
    }
  ];

class LiveLeaderboard extends Component {

    render() {
        let {liveScores} = this.props
        return (
            <React.Fragment>
                <DataTable
                    keyField={liveScores}
                    columns={columns}
                    data={liveScores}
                />
            </React.Fragment>
        )
    }
}

export default LiveLeaderboard