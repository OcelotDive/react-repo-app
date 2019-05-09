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
        ]).then(function(players) {
            
            if(players === null) { //if error
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
        
      return (
        <div>Results</div>
      )
    }
}

module.exports = Results;