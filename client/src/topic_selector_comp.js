import React from 'react';
import { Button } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import './index.css';
import './topic_selector_comp.css'

const ListItem = ({ value, onClick }) => (
    <li class="item" onClick={onClick}>{value}</li>
  );
  
  const List = ({ items, onItemClick }) => (
    <ul>
      {
        items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick(item)} />)
      }
    </ul>
  );
  
  class TopicSelect extends React.Component {
    constructor(props) {
      super(props);
      //this.props = props;
      this.state = {
        inputValue: '',
        topics: []
      };
      this.removeTopic = this.removeTopic.bind(this);
    }

    componentDidMount() {
      const { topics, returnTopicList } = this.props;

      console.log("mounted");

      returnTopicList(topics)
    };

    returnTopics() {
      return ( <p>{this.props.topics}</p> );
    }
  
    onClick = () => {
      const { inputValue, topics } = this.state;
      if (inputValue) {
        const nextState = [...topics, inputValue];
        this.setState({ topics: nextState, inputValue: '' });
      }
    }

    removeTopic(t) {
      var topics = [...this.state.topics]; // make a separate copy of the array
      var index = topics.indexOf(t);
      if (index !== -1) {
        topics.splice(index, 1);
        this.setState({ topics: topics, inputValue: '' });
      }
    }

    onItemClick = item => () => {
      this.removeTopic(item);
    }
  
    onChange = (e) => this.setState({ inputValue: e.target.value });

    render() {
      const { topics, inputValue } = this.state;
      //const { topics } = this.props;

      return (
        <div class="comp_div">
          <div class="inner_div">
            <input class="inner_div" type="text" value={inputValue} onChange={this.onChange} />
            <Button buttonStyle="primary" onClick={this.onClick}>Add</Button>
            <Button buttonStyle="primary" onClick={this.returnTopics}>Done</Button>
          </div>

          <div class="list_div">
            <List items={topics} onItemClick={this.onItemClick} />
          </div>

        </div>
      );
    }
  }

export default TopicSelect;