const React = require('react');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Results = require('./Results');

//set the route component where you want a specific component displayed
//after navigating to that path
//Switch renders on specific route that is not an active route eg 404
//routes will work for links on imported components
class App extends React.Component {
    
render() {
    return(
        <Router>
            <div className="container">
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/battle" component={Battle} />
                <Route exact path="/battle/results" component={Results} />
                <Route path="/popular" component={Popular} />
            
                <Route render={() => {
                  return (
                      <div>
                      Not Found
                      </div>
                  )
                }} />
            </Switch>
            </div>
        </Router>
        )
    }
    
}

module.exports = App;