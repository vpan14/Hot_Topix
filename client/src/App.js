import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "asdf" };
  }

  getToken () {
    console.log("called getToken");
    fetch("http://localhost:3001/getToken")
    .then(res => res.text())
    .then(res => {
      this.setState({ apiResponse: res });
      console.log(res);
    })
    .catch(err => {console.log(err);}
    );
  }

  componentWillMount() {
      this.getToken();
      console.log("calling getToken");
  }

  render () {
    console.log(this.state.apiResponse);
    return (
      // <div>
      // <p>{this.state.apiResponse}</p>
      <StreamApp
        // apiKey={this.token.apiResponse}
        // appId={this.token.apiResponse}
        // token={this.token.apiResponse}
        apiKey="sjc92jugd7js"
        appId="62811"
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidnBhbiJ9.ldpOOtE5eXDuuF9tu9NVTkZikobvW0cL96rDjKDlXBY"
        //token={this.state.apiResponse}
      >
        <NotificationDropdown
          userId="vpan"
          notify
        />
        <StatusUpdateForm
          feedGroup="Timeline"
          userId="vpan"
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
