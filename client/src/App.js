import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import TopicSelect from './topic_selector_comp.js';
import 'react-activity-feed/dist/index.css';
import'./topic_selector_comp.css';

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

  componentWillMount() {
      this.getToken();
      console.log("calling getToken");
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
      // <p>{this.state.apiResponse}</p>

      <div style={ {padding: '8px 16px'} }>
        <TopicSelect/>
      </div>

      <StreamApp
        apiKey="sjc92jugd7js"
        appId="62811"
        token={this.state.apiResponse}
      >

        <NotificationDropdown
          //userId="vpan"
          notify
        />
        <StatusUpdateForm
          feedGroup="Timeline"
          //userId="vpan"
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
