const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

//no state so changed to stateless functional component
//this.props just becomes props
function SelectLanguage(props)  {
   
        const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        return (
            <ul className="languages">
            {languages.map(lang => <li style={lang === props.selectedLanguage ? {color: 'red'} : null}
            key={lang} 
            onClick={props.onSelect.bind(null, lang)}>{lang}</li>)}
            </ul> 
        )
    
}


function RepoGrid(props) {

    return (
        <ul className="popular-list">
        {props.repos.map(function(repo, index) {
            return (
                
                <li key={repo.name} className="popular-item">
                    <div className="popular-rank">{'#' + index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <img className="avatar"
                                src={repo.owner.avatar_url}
                                alt={'Avatar for ' + repo.owner.login}/>
                        </li>
                        <li><a href={repo.html_url}>{repo.name}</a></li>
                        <li>{"@" + repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>      
                    </ul>
                </li>
            )
       })}
        </ul>

    )
}
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

function Test(props) {
           return(
           <div>{props.message}</div>
           )
       }
Test.defaultProps = {
    message: "this is the default message"
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        
        this.updateLanguage = this.updateLanguage.bind(this);   
    
   
    }
   componentDidMount() {
       //Ajax
       this.updateLanguage(this.state.selectedLanguage);
   }
    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
        
         api.fetchPopularRepos(lang)
            .then((repos)=> {
           this.setState(()=> {
            return  { repos: repos }
           })
             
       })
    }
    render() {
       
                
        return (
            <div>
            {/*<Test/>*/}
            <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
            {!this.state.repos
            ? <p>Loading</p>
            :
            <RepoGrid repos={this.state.repos} />}
            </div>
        )
    }
}

module.exports = Popular;
