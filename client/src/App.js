import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

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
    fetch("http://localhost:3001/getToken")
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
      // <div>
      // <p>{this.state.apiResponse}</p>
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
      // </div>
    );
  }
}

export default App;
