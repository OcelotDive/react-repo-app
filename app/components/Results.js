const React = require("react");
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require("react-router-dom");

class Results extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount() {
         const players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function(results) {
            
            if(results === null) { //if error
                return this.setState(()=> {
                    return {
                        error: "Looks like an error occurred",
                        loading: false
                    }
                })
            }
            //if no error
            this.setState(()=> {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            });
        }.bind(this))
    }
                
    render() {
    //will show props passed by react router    console.log(this.props)
       
        const error = this.state.error;
        const winner = this.state.winner;
        const loser = this.state.loser;
        const loading = this.state.loading;
        
        if(loading === true) {
            return <p>Loading</p>
        }
        if(error) {
            return (
            <div>
                <p>{error}</p>
                <Link to="/battle">Reset</Link>
            </div>
            )
        }
        
      return (
        <div className="row">
          <Player 
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player 
            label="Loser"
            score={loser.score}
            profile={loser.profile}
          />
          </div>
      )
    }
}

module.exports = Results;