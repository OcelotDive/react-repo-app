const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');




class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // the state will be updated everytime the onChange is called which
    // in turn will update the user field value
    handleChange(event) {
        const value = event.target.value;
        
        this.setState(function()  {
            return {
                username: value
            }
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        this.props.onSubmit(this.props.id, this.state.username);
    }
    //note value attr binding the state property to the input field
    render() {
        
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input id="username"
                        placeholder="github username"
                        type="text"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleChange}
                />
                <button
                    className="button"
                    type="submit"
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
    
    
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}


// if component has state constructor and super take props
class Battle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playerOneName: '', 
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
            
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    
    handleSubmit(id, username) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        })
    }
    
    handleReset(id) {
        this.setState(() => {
            var newState = {};
            newState[id + "Name"] = "";
            newState[id + "Image"] = null;
            return newState;
        });
    }
    
    render() {
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        var match = this.props.match;
        //match is a prop passed in by react router to show the current url
        return(
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput  
                        label='Player One' 
                        onSubmit={this.handleSubmit}/>}
            
                    {playerOneImage !== null &&
                        <PlayerPreview avatar={playerOneImage} 
                        username={playerOneName} 
                        id={"playerOne"}
                        >
                            
                        <button className="reset" onClick={this.handleReset.bind(null, "playerOne")}>Reset</button>
                        </PlayerPreview>}
            
                    {!playerTwoName &&
                        <PlayerInput  
                        label='Player Two' 
                        onSubmit={this.handleSubmit}/>}
            
                    {playerTwoImage !== null &&
                        <PlayerPreview avatar={playerTwoImage} 
                        username={playerTwoName} 
                        id={"playerTwo"}
                        >
                            
                        <button className="reset" onClick={this.handleReset.bind(null, "playerTwo")}>Reset</button>    
                        </PlayerPreview>}
            </div>
            
            {playerOneImage && playerTwoImage &&
                <Link className="button"
                      to={{pathname: match.url + "/results",
                            search: "?playerOneName=" + playerOneName + "&playerTwoName=" + playerTwoName
                }}>
                        Battle
                </Link>}
            
            </div>
        )
    }
    
    
}

module.exports = Battle;