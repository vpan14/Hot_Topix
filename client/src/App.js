import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

class App extends React.Component {
  render () {
    return (
      <StreamApp
        apiKey="2awqgkw9rzgj"
        appId="62539"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.ljVM50gE9_oDeJ5pNSAPoGrOsVVIYJkXP1dpq-gv2NM"
      >
        <NotificationDropdown notify />
        <StatusUpdateForm
          feedGroup="timeline"
          userId="user-one" />
        <FlatFeed
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
    );
  }
}

export default App;
