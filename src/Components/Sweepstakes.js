import React, { useState }  from 'react'
import DataTable from 'react-data-table-component';
import Name from './Name'
import PlayerName from './PlayerName'

let date = new Date()
let omitAtRisk = [0,1,2,3,4,6,7].includes(date.getDay());

const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        minWidth: '90px'
      },
    },
  };

  function getColumns(liveScores) {
    return [
        {
            name: '',
            selector: (row, index) => row.id + 1,
            grow: 0,
        },
        {
            name: 'Name',
            cell: row => <Name row={row} />,
            sortable: true,
        },
        {
            name: 'Score',
            selector:  row => row.visual_score,
            sortable: true,
            grow: 0,
        },
        {
            name: 'At Risk?',
            cell: row => row.at_risk ,
            sortable: true,
            omit: omitAtRisk,
        },
        {
            name: 'Group 1',
            selector: row => <PlayerName player={row.group_1} liveScores={liveScores} />  ,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Group 2',
            selector: row => <PlayerName player={row.group_2} liveScores={liveScores} /> ,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Group 3',
            selector: row => <PlayerName player={row.group_3} liveScores={liveScores} /> ,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Group 5',
            selector: row => <PlayerName player={row.group_5} liveScores={liveScores} /> ,
            sortable: true,
            wrap: true,
        }
      ];
  }


  function Sweepstakes(props) {

    const [nameFilter, setNameFilter] = useState('');

    const { updatedScores, liveScores, textColor } = props

     const sortedData = props.enhancedSweepstakeData.sort(function(a, b){
         return  a.total_score - b.total_score
     });

    const mappedData = sortedData.map((item, index) => ({
        id: index,
        ...item, 
    }))

    let filteredMappedData = mappedData.filter(function (sweepstakeEntry) {
        return sweepstakeEntry.Initials.toUpperCase().includes(nameFilter.toUpperCase());
      }
    );

    return (
        <React.Fragment>
          <p><i className={`fa fa-clock-o fa-fw w3-margin-right w3-large ${textColor}`} />Last Updated at {updatedScores.getHours()}:{updatedScores.getMinutes()}:{updatedScores.getSeconds()}</p>
          
          <form>
            <label>
              <span className={`${textColor}`}>Filter by Name:</span>
              <input type="text" value={nameFilter} name="nameFilter" onChange={e => setNameFilter(e.target.value)} />
            </label>
          </form>
            
            <DataTable 
                columns={getColumns(liveScores)}
                data={filteredMappedData}
                customStyles={customStyles}
            />
        </React.Fragment>
    )
}

export default React.memo(Sweepstakes)