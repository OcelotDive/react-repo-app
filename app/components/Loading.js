const React = require('react');
const PropTypes = require("prop-types");


class Loading extends React.Component {
    
    constructor(props) {
        super(props);  
        
        this.state = {
            text: props.text
        }
    }
    
    componentDidMount() {
        
       let text = this.props.text;
        let originalText = this.props.text;
        const stopper = this.props.text.length;
        let index = 0;
        this.interval = window.setInterval(function() { 
            if(index === stopper) {
                text = originalText;
                console.log(originalText)
                index = 0;
            }
            else {
                text = text.split("");
                text[index] = text[index].toUpperCase();
                if(text[index - 1] !== undefined) {
                text[index - 1] = text[index -1 ].toLowerCase();
                }
                text = text.join("");
                index++
            }
            this.setState(function() {
                //always return new state rather than mutating the existing state
                return {
                    text: text
                }
            })
    //bind the interval to the component with .bind        
    }.bind(this),50)
    }
    
    //make sure to clear interval on unmount
    componentWillUnmount() {
        window.clearInterval(this.interval);
    }
         

    render() {
        
        return(
            <p style={{textAlign: "center", fontSize: "65px"}}>
            {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired
}
Loading.defaultProps = {
    text: "Loading"
}

module.exports = Loading;