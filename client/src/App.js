import React from 'react';
import { StreamApp, UserBar, Button, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import TopicSelect from './topic_selector_comp.js';
import'./topic_selector_comp.css';

var router = require('./index.js');

var urlString = window.location.href;
var splitString = urlString.split('/');
urlString = splitString[0] + "/" + splitString[1] + "/" + splitString[2] + "/getToken";
console.log(urlString);
//urlString = "http://localhost:3001/getToken";
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//     // dev code
//     urlString = "http://localhost:3001/getToken";
// } else {
//     // production code
//     urlString = "https://hottopix.herokuapp.com/getToken";
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelector: false,
      apiResponse: "asdf",
      loaded: false
    };
  }

  getToken () {
    console.log("called getToken");
    fetch(urlString)
    .then(res => res.text())
    .then(res => {
      this.setState({
        apiResponse: res,
        loaded: true
      });
      //console.log(res);
    })
    .catch(err => {console.log(err);}
    );
  }

  triggerShowTopicSelector = () => {
    this.setState({
      ...this.state,
      showSelector: true
    })
  }

  triggerHideTopicSelector = () => {
    this.setState({
      ...this.state,
      showSelector: false
    })
  }

  componentWillMount() {
      this.getToken();
      console.log("calling getToken");
  }

  signout() {
    router.
    router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });
  }

  render () {
    //console.log(process.env['REACT_APP_API']);
    //console.log(process.env['REACT_APP_ID']);
    //console.log(this.state.apiResponse);
    if(!this.state.loaded) {
      return null;
    }
    return (
      <div>

      <StreamApp
        apiKey="sjc92jugd7js"
        appId="62811"
        token={this.state.apiResponse}
      >
      
        <UserBar
          avatar="test_profile_pic.png"

          AfterUsername={<div><form action="/logout"><Button type="submit" buttonStyle="info">Sign Out</Button></form></div>}

          username="Dan the Fireman"
          subtitle="extinguising fires since 1999"
          timestamp="2018-09-19T07:44:11+00:00"
          onClickUser={() => console.log('clicked the user')}
        />

        <br></br>

        <StatusUpdateForm
          feedGroup = "Timeline"
          FooterItem={
            <div>
              <div>
                { this.state.showSelector && <Button buttonStyle="info" onClick={this.triggerHideTopicSelector}>Cancel</Button> }
                { this.state.showSelector ? <Button buttonStyle="primary" onClick={this.triggerHideTopicSelector}>Done</Button> : <Button
                  buttonStyle="primary" onClick={this.triggerShowTopicSelector}>Add Topics</Button> }
              </div>
              { this.state.showSelector && <TopicSelect/> }
            </div>
          }
        />

        <FlatFeed
          feedGroup = "Timeline"
          options={ {reactions: { recent: true } } }
          notify
          Activity={(props) =>
              <Activity {...props}
              Footer={() => (
                  <div style={ {padding: '8px 16px'} }>
                    <LikeButton {...props} />
                    <CommentField
                      activity={props.activity}
                      onAddReaction={props.onAddReaction} />
                    <CommentList activityId={props.activity.id} />
                  </div>
                )}
              />
            }
          />
      </StreamApp>
      </div>
    );
  }
}

export default App;
