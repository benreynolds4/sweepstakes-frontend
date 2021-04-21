import React, { Component } from 'react';
import axios from 'axios';
import LiveLeaderboard from './Components/LiveLeaderboard';
import DreamTeam from './Components/DreamTeam';
import Sweepstakes from './Components/Sweepstakes'
import sweepstakesData from "./Data/data.json";
import groupsData from "./Data/groups.json";


export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      liveScores: [],
      enhancedSweepstakeData: [],
      updatedScores: new Date()
    }

    this.setLiveScores = this.setLiveScores.bind(this)
  }

  setLiveScores(liveScores) {
    this.setState({
      updatedScores: new Date(),
      liveScores: liveScores
    })
  }

  setEnhancedSweepstakeData(liveScores) {
    this.setState({
      enhancedSweepstakeData: this.getEnhancedSweepstakeData()
    })
  }

  componentDidMount() {
    axios.get(`https://522wfpt6n6.execute-api.eu-west-1.amazonaws.com/prod/pga-scores`)
        .then((res) => {
            this.setLiveScores(res.data)
            this.setEnhancedSweepstakeData()
        })
    setInterval(() => 
      axios.get(`https://522wfpt6n6.execute-api.eu-west-1.amazonaws.com/prod/pga-scores`)
        .then((res) => {
            this.setLiveScores(res.data)
            this.setEnhancedSweepstakeData()
        })
        , 180000);  //180000
  }

  getTotalPoints(playersArray) {
      var {liveScores} = this.state
      
      if(liveScores != undefined) {
          var totalScore = 0
          for (var i = 0; i < playersArray.length; i++) {
              let playerScore = this.getPlayerScore(playersArray[i])
              if (this.playerDoesntExist(playerScore)) {
                console.log("Missing Player: " + playersArray[i])
                return 1000001
              }
              if (this.hasMissedCut(playerScore)) {
                console.log(playersArray[i] + "Missed Cut")
                return 1000000
              } 
              let position = playerScore.position.replace('T','')
              totalScore += parseInt(position)
          }
      }

      return totalScore
  }

  isAtRisk(playersArray) {
    var {liveScores} = this.state
    if(liveScores != undefined) {
      for (var i = 0; i < playersArray.length; i++) {
        let playerScore = this.getPlayerScore(playersArray[i])
        if (this.playerDoesntExist(playerScore) || this.hasMissedCut(playerScore)) {
          return "Yes"
        }
        let position = playerScore.position.replace('T','')
        if(parseInt(position) > 50) {
          return "Yes "
        }
      }
    }
    return "No"
  }

  getPercentageMissedCuts() {
    var totalCount = sweepstakesData.length
    var missedCuts = 0
    sweepstakesData.forEach(sweepstake  => {
      let players = [sweepstake.group_1, sweepstake.group_2, sweepstake.group_3, sweepstake.group_4, sweepstake.group_5]
      var missedCut = false
      for (var i = 0; i < players.length; i++) {
        let playerScore = this.getPlayerScore(players[i])
        if (playerScore != undefined) {
          if (this.hasMissedCut(playerScore)) {
            missedCut = true
            break;
          }
        }
      }
      if (missedCut) {
        missedCuts += 1
      }
    })

    return String(((missedCuts / sweepstakesData.length) * 100).toFixed(2)) + "%"
  }

  getEnhancedSweepstakeData() {
    sweepstakesData.forEach(sweepstake  => {
          sweepstake.total_score = this.getTotalPoints([sweepstake.group_1, sweepstake.group_2, sweepstake.group_3, sweepstake.group_4, sweepstake.group_5])
          sweepstake.at_risk = this.isAtRisk([sweepstake.group_1, sweepstake.group_2, sweepstake.group_3, sweepstake.group_4, sweepstake.group_5])
          sweepstake.keyField = sweepstake.Initials
          if (sweepstake.total_score == "1000001") {
            sweepstake.visual_score = "Missing Player"
          } 
          else if(sweepstake.total_score == "1000000") {
            sweepstake.visual_score = "Missed Cut" // TODO: Update to Missed Cut
          }
          else {
            sweepstake.visual_score = sweepstake.total_score
          }
      })
      return sweepstakesData
  }

  getDreamTeam() {
    var {liveScores} = this.state
    let dreamTeam = {}
    if(liveScores != undefined) {
      groupsData.forEach(group => {
        for(var i = 0; i < liveScores.length; i++) {
          if(group.players.includes(liveScores[i].player)) {
            dreamTeam[group.group] = liveScores[i].player
            break;
          }
        }
      })
      dreamTeam.keyField = "best_team"
      dreamTeam.total_score = this.getTotalPoints([dreamTeam.group_1, dreamTeam.group_2, dreamTeam.group_3, dreamTeam.group_4, dreamTeam.group_5])
      dreamTeam.visual_score = dreamTeam.total_score == "1000000" ? "Not Started" : dreamTeam.total_score
      dreamTeam.Initials = ""
      dreamTeam.Name = "Dream Team*"
      return dreamTeam
    }
    
    return {}
  }

  getPlayerScore(player) {
      var {liveScores} = this.state
      return liveScores.find(score => score.player.toLowerCase() == player.toLowerCase())
  }

  hasMissedCut(playerScore) {
      if (playerScore.position == '-') {
          return true
      }
      return false
  }

  playerDoesntExist(playerScore) {
    if (playerScore == undefined) {
      return true
    }
    return false
  }

  render() {
    const { liveScores, enhancedSweepstakeData, updatedScores } = this.state
    return (
      <React.Fragment>
        <div className="w3-row-padding">
        <div className="w3-twothird">
          <div className="w3-container w3-card w3-white">
            <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal" />Sweepstakes:</h2>
            <Sweepstakes updatedScores={updatedScores}  enhancedSweepstakeData={enhancedSweepstakeData} />
          </div>
        </div>
        <div className="w3-third">  
          <div className="w3-white w3-text-grey w3-card-4">
            <div className="w3-display-container">
              <img src="https://static01.nyt.com/images/2020/04/06/sports/06virus-british-open1/merlin_170463504_0b493bed-a521-487c-a968-9dda9bff770f-jumbo.jpg?quality=90&auto=webp" style={{width: '100%'}} alt="Avatar" />
            </div>
            <div className="w3-container">
              <p><i className="fa fa-money fa-fw w3-margin-right w3-large w3-text-teal" />1st Prize: €{Math.ceil((enhancedSweepstakeData.length * 10) * .7)}</p>
              <p><i className="fa fa-money fa-fw w3-margin-right w3-large w3-text-teal" />2nd Prize: €{Math.ceil((enhancedSweepstakeData.length * 10) * .15)}</p>
              <p><i className="fa fa-money fa-fw w3-margin-right w3-large w3-text-teal" />3nd Prize: €{Math.ceil((enhancedSweepstakeData.length * 10) * .05)}</p>
              <p>% Entries Missed Cut</p>
              <div className="w3-light-grey w3-round-xlarge w3-small">
                
                <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{width: this.getPercentageMissedCuts()}}>{this.getPercentageMissedCuts()}</div>
                {/*<div className="w3-container w3-center w3-round-xlarge w3-teal" style={{width: 0}}>0%</div>*/}
              </div>
              <hr />

              <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />The Dream Team</b></p>
              <DreamTeam team={this.getDreamTeam()} />

              <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />Most Picked By Group</b></p>
              <ul style={{ listStyleType: "none" }}>
                <li>Justin Thomas (28%)</li>
                <li>Lee Westwood (17%)</li>
                <li>Tommy Fleetwood (28%)</li>
                <li>Matt Kuchar (23%)</li>
                <li>Billy Horschel (30%)</li>
              </ul>
              
              
              <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />Masters Leaderboard</b></p>
              <LiveLeaderboard liveScores={liveScores} />
            </div>
          </div><br /><br />
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default App
