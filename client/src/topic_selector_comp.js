import React from 'react';
import './index.css';
import './topic_selector_comp.css'

const ListItem = ({ value, onClick }) => (
    <li onClick={onClick}>{value}</li>
  );
  
  const List = ({ items, onItemClick }) => (
    <ul>
      {
        items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
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
    }
  
    onClick = () => {
      const { inputValue, topics } = this.state;
      if (inputValue) {
        const nextState = [...topics, inputValue];
        this.setState({ topics: nextState, inputValue: '' });
      }
    }
  
    onChange = (e) => this.setState({ inputValue: e.target.value });
  
    handleItemClick = (e) => {console.log(e.target.innerHTML)}
  
    render() {
      const { topics, inputValue } = this.state;
      return (
        <div>
          <input type="text" value={inputValue} onChange={this.onChange} />
          <button onClick={this.onClick}>Add</button>
          <List items={topics} onItemClick={this.handleItemClick} />
        </div>
      );
    }
  }

// let items_list = [];

// const ListItem2 = ({ value, onClick }) => (
//     <li onClick={onClick}>{value}</li>
// );

// class TopicSelect extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             textarea: '',
//         };
//     }

//     textAreaChanged_textarea = (event) => {
//         this.setState({textarea: event.target.value});
//     }
  
//     onClick_elButton = (ev) => {
//         //this.sendData_button_to_listData1();
//         textarea
//         items_list.concat(

//         // Clear internal state for data-providing elements in this component
//         this.setState({
//             textarea: "",
//         });

//     }


//     sendData_button_to_listData1 = () => {
//         // const dataSheet = this.props.appActions.getDataSheet('listData1');

//         // let row = this.props.dataSheetRow || {
//         //     "field": this.props.field,
//         // };
//         // row = { ...row, 
//         //     field: this.state.textarea,
//         // };
//         // if (this.props.dataSheetId === dataSheet.id) {
//         //     this.props.appActions.updateInDataSheet('listData1', row);
//         // } else {
//         //     this.props.appActions.addToDataSheet('listData1', row);
//         // }
//     }  
  
//     render() {
//         const style_elTextarea = {
//             display: 'block',
//             backgroundColor: 'white',
//             borderColor: 'lightGray',
//             paddingLeft: '1rem',
//             boxSizing: 'border-box', // ensures padding won't expand element's outer size
//             pointerEvents: 'auto',
//         };
    
//         const style_elButton = {
//             display: 'block',
//             color: 'white',
//             textAlign: 'center',
//             cursor: 'pointer',
//             pointerEvents: 'auto',
//         };
        
//         const enabledValue_button = this.props.field;
        
//         const style_elList = {
//             height: 'auto',  // This element is in scroll flow
//         };
        
//         return (
//         <div className="TopicSelector appBg">
//             <div className="layoutFlow">
//             <div className='elTextarea'>
//                 <textarea className="baseFont" style={style_elTextarea}  placeholder="Type new topic" onChange={this.textAreaChanged_textarea} value={this.state.textarea}  />
//             </div>

//             <div></div>
            
//             <div className='elButton'>
//                 <button style={style_elButton} onClick={this.onClick_elButton} >Add</button>
//             </div>
            
//              <div className='elList'>
//                  <ul className="" style={style_elList}>
//                  {items_list.map((row, index) => {
//                       let itemComp = (row._componentId) ? items_list[row._componentId] : <ListItem2 dataSheetId={'listData1'} dataSheetRow={row} appActions={this.props.appActions} deviceInfo={this.props.deviceInfo} locStrings={this.props.locStrings} />;
//                       return (<li key={row.key}>{itemComp}</li>)
//                  })}
//                  <div ref={(el)=> this._elList_endMarker = el} />
//                  </ul>
//              </div>
//         </div>
//         </div>
//         );
//     }
//}
export default TopicSelect;