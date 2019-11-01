import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

class App extends React.Component {
  render () {
    return (
      <StreamApp
        apiKey="sjc92jugd7js"
        appId="62811"
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidnBhbiJ9.ldpOOtE5eXDuuF9tu9NVTkZikobvW0cL96rDjKDlXBY"
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
    );
  }
}

export default App;
