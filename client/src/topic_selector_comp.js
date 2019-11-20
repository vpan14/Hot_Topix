import React from 'react';
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
      this.state = {
        inputValue: '',
        topics: []
      };
      this.removeTopic = this.removeTopic.bind(this);
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
      return (
        <div class="comp_div">
          <div class="inner_div">
            <input type="text" value={inputValue} onChange={this.onChange} />
            <button class="add_btn" onClick={this.onClick}>Add</button>
          </div>

          <div class="list_div">
            <List items={topics} onItemClick={this.onItemClick} />
          </div>

          <button>Done</button>

        </div>
      );
    }
  }

export default TopicSelect;