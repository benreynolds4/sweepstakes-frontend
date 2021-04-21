import React from 'react'
import DataTable from 'react-data-table-component';


const columns = [
    {
        name: '',
        selector: (row, index) => index + 1,
        grow: 0,
    },
    {
        name: 'Name',
        selector: row => row.Initials,
        sortable: true,
    },
    {
        name: 'Score',
        selector:  row => row.visual_score,
        sortable: true,
        grow: 0,
    },
    {
        name: 'Group 1',
        selector: row => row.group_1 ,
        sortable: true,
    },
    {
        name: 'Group 2',
        selector: row => row.group_2,
        sortable: true,
    },
    {
        name: 'Group 3',
        selector: row => row.group_3,
        sortable: true,
    },
    {
        name: 'Group 4',
        selector: row => row.group_4,
        sortable: true,
    },
    {
        name: 'Group 5',
        selector: row => row.group_5,
        sortable: true,
    }
  ];


  function Sweepstakes(props) {
    const { enhancedSweepstakeData,  updatedScores } = props

     const sortedData = props.enhancedSweepstakeData.sort(function(a, b){
         return  a.total_score - b.total_score
     });

    const mappedData = sortedData.map((item, index) => ({
        id: index,
        ...item, 
    }))

    return (
        <React.Fragment>
            <p><i className="fa fa-clock-o fa-fw w3-margin-right w3-large w3-text-teal" />Last Updated at {updatedScores.getHours()}:{updatedScores.getMinutes()}:{updatedScores.getSeconds()}</p>
            <DataTable 
                columns={columns}
                data={mappedData}
            />
        </React.Fragment>
    )
}

export default React.memo(Sweepstakes)