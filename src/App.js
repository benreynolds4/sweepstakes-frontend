import React, { Component } from 'react';
import axios from 'axios';
import LiveLeaderboard from './Components/LiveLeaderboard';
import DreamTeam from './Components/DreamTeam';
import Sweepstakes from './Components/Sweepstakes'
import Raffle from './Components/Raffle'
import Prizes from './Components/Prizes'
import MostPicked from './Components/MostPicked'
import PreviousLeaderboards from './Components/PreviousLeaderboards';

import masters21SweepstakesData from "./Data/masters21-data.json";
import masters21GroupsData from "./Data/masters21-groups.json";
import masters22SweepstakesData from "./Data/masters22-casey-data.json";
import masters22GroupsData from "./Data/masters22-groups.json";
import theOpen21SweepstakesData from "./Data/theopen21-data.json";
import theOpen21GroupsData from "./Data/theopen21-groups.json";



const TournamentURLs = {
  MASTERS_21: 'masters21',
  MASTERS_22: 'masters22',
  THE_OPEN_21: 'theopen21',
}


const masters = true;
const color = masters ? "w3-teal" : "w3-indigo";
const textColor = masters ? "w3-text-teal" : "w3-text-indigo";
const groupsData = masters22GroupsData;
const sweepstakesData = masters22SweepstakesData;
const tournamentEndpoint = TournamentURLs.MASTERS_22;
const howManyMakeCut = 50; // 50 for masters, 70 for the open.
const apiURL = 'https://gjug2h7ikj.execute-api.eu-west-1.amazonaws.com/Prod/';
const showRaffle = false;
const LAST_OUT = new Date('2022-04-07T19:15:00'); // TODO: Update with last tee time

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
    axios.get(apiURL + tournamentEndpoint) 
        .then((res) => {
            this.setLiveScores(res.data)
            this.setEnhancedSweepstakeData()
        })
    setInterval(() => 
      axios.get(apiURL + tournamentEndpoint)
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
        if(parseInt(position) > howManyMakeCut) { 
          return "Yes "
        }
      }
    }
    return "No"
  }

  getPercentageAtRisk() {
    var atRisk = 0
    sweepstakesData.forEach(sweepstake  => {
      if (sweepstake.at_risk === "Yes ") {
        atRisk++;
      }
    })

    return String(((atRisk / sweepstakesData.length) * 100).toFixed(2)) + "%"
  }

  getPercentageMissedCuts() {
    var missedCuts = 0
    sweepstakesData.forEach(sweepstake  => {
      let players = [sweepstake.group_1, sweepstake.group_2, sweepstake.group_3, sweepstake.group_5]
      var missedCut = false
      for (var i = 0; i < players.length; i++) {
        let playerScore = this.getPlayerScore(players[i])
        if (playerScore !== undefined) {
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

  hasAllStarted() {
    return new Date() > LAST_OUT;
  }

  getEnhancedSweepstakeData() {
    sweepstakesData.forEach(sweepstake  => {
          sweepstake.total_score = this.getTotalPoints([sweepstake.group_1, sweepstake.group_2, sweepstake.group_3, sweepstake.group_5])
          sweepstake.at_risk = this.isAtRisk([sweepstake.group_1, sweepstake.group_2, sweepstake.group_3, sweepstake.group_5])
          sweepstake.keyField = sweepstake.Initials
          
          if (sweepstake.total_score == "1000001") {
            sweepstake.visual_score = "Missing Player"
          } 
          else if(sweepstake.total_score == "1000000") {
            if (this.hasAllStarted()) {
              sweepstake.visual_score = "Missed Cut"
            }
            else {
              sweepstake.visual_score = "Not Started"
            }
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

      if ('group_1' in dreamTeam && 'group_2' in dreamTeam && 'group_3' in dreamTeam 
             && 'group_5' in dreamTeam) {
              dreamTeam.keyField = "best_team"
              dreamTeam.total_score = this.getTotalPoints([dreamTeam.group_1, dreamTeam.group_2, dreamTeam.group_3, dreamTeam.group_5])
              dreamTeam.visual_score = dreamTeam.total_score === 1000000 ? "Not Started" : dreamTeam.total_score
              dreamTeam.Initials = ""
              dreamTeam.Name = "Dream Team*"
              return dreamTeam
            }
    }
    
    return {}
  }

  getPlayerScore(player) {
      var {liveScores} = this.state;
      return liveScores.find(score => score.player.toLowerCase() == player.toLowerCase());
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

    let date = new Date()
    let missedCuts;
    if (date.getDay() > 5) {
      missedCuts = <React.Fragment>
          <p>% Entries Missed Cut</p>
          <div className="w3-light-grey w3-round-xlarge w3-small">
            <div className={`w3-container w3-center w3-round-xlarge ${color}`} style={{width: this.getPercentageMissedCuts()}}>{this.getPercentageMissedCuts()}</div>
          </div>
      </React.Fragment>
    } 
    else if ( date.getDay() > 3) {
      missedCuts = <React.Fragment>
          <p>% Entries At risk of missing cut</p>
          <div className="w3-light-grey w3-round-xlarge w3-small">
            <div className={`w3-container w3-center w3-round-xlarge ${color}`} style={{width: this.getPercentageAtRisk()}}>{this.getPercentageAtRisk()}</div>
          </div>
      </React.Fragment>
    }
    return (
      <React.Fragment>
        <div className="w3-row-padding">
        <div className="w3-twothird">
          <div className="w3-container w3-card w3-white">
            <h2 className={`w3-padding-16 ${textColor}`}><i className={`fa fa-certificate fa-fw w3-margin-right w3-xxlarge ${textColor}`} />The Masters Sweepstakes</h2>
            <Sweepstakes textColor={textColor} updatedScores={updatedScores} liveScores={liveScores}  enhancedSweepstakeData={enhancedSweepstakeData}  />
          </div>
        </div>
        <div className="w3-third">  
          <div className="w3-white w3-text-grey w3-card-4">

            <div className="w3-container">
              <section className="w3-container">
                {masters ? 
                <div className="w3-display-container">
                  <h2 className={`w3-padding-16 ${textColor}`}><i className={` w3-xxlarge ${textColor}`} />Supported by</h2>
                  <a href="https://lhw.ie/" target="_blank">
                    <img src={'LHW.png'} className="center" style={{width: '100%'}}  alt="LHW Financial Planning" />
                  </a>
                </div>
                 :
                <img src={'globalgolf4cancer.jpeg'} className="center fifty-percent"  alt="Global Golf 4 Cancer Logo" />
                }
                
              </section>
              <hr />
              <Raffle textColor={textColor} showRaffle={showRaffle} sweepstakesData={enhancedSweepstakeData} />
              <Prizes textColor={textColor} sweepstakesData={enhancedSweepstakeData} />
              {missedCuts}
              <hr />
              
              <DreamTeam textColor={textColor} team={this.getDreamTeam()} />
              <MostPicked textColor={textColor} sweepstakesData={enhancedSweepstakeData} groupsData={groupsData} /> 
              <PreviousLeaderboards textColor={textColor} /> 
              <LiveLeaderboard textColor={textColor} liveScores={liveScores} />
            </div>
          </div><br /><br />
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default App
