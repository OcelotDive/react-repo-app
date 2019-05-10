const React = require('react');
const PropTypes = require("prop-types");


class Loading extends React.Component {
    
    constructor(props) {
        super(props);  
        
        this.state = {
            text: props.text
        }
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