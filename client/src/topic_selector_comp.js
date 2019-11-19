import React from 'react';
import './index.css';
import Button from 'elemental'
import './topic_selector_comp.css'
import '../node_modules/elemental/less/elemental.less'

class TopicSelect extends React.Component {
    
    // Properties used by this component:
    // food, field
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         textarea: '',
    //     };
    // }

    textAreaChanged_textarea = (event) => {
        //this.setState({textarea: event.target.value});
    }
  
    onClick_elButton = (ev) => {
        //this.sendData_button_to_listData1();

        // Clear internal state for data-providing elements in this component
        //this.setState({
            //textarea: "",
        //});

    }


    sendData_button_to_listData1 = () => {
        // const dataSheet = this.props.appActions.getDataSheet('listData1');

        // let row = this.props.dataSheetRow || {
        //     "field": this.props.field,
        // };
        // row = { ...row, 
        //     field: this.state.textarea,
        // };
        // if (this.props.dataSheetId === dataSheet.id) {
        //     this.props.appActions.updateInDataSheet('listData1', row);
        // } else {
        //     this.props.appActions.addToDataSheet('listData1', row);
        // }
    }  
  
    render() {
        const style_elTextarea = {
            display: 'block',
            backgroundColor: 'white',
            borderColor: 'lightGray',
            paddingLeft: '1rem',
            boxSizing: 'border-box', // ensures padding won't expand element's outer size
            pointerEvents: 'auto',
        };
    
        const style_elButton = {
            display: 'block',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
        };
        
        //const enabledValue_button = this.props.field;
        
        const style_elList = {
            height: 'auto',  // This element is in scroll flow
        };
        
        // Source items and any special components used for list/grid element 'list'.
        let items_list = [];
        //items_list = items_list.concat(this.props.appActions.getDataSheet('listData1').items);
        
        return (
        <div>
        <div className='Test'>
            <p><strong>Hello, World!</strong></p>
        </div>
{/* 
        <div className="TopicSelector appBg">
            <div className="layoutFlow">
            <div className='elTextarea'>
                <textarea className="baseFont" style={style_elTextarea}  placeholder="Type new topic" onChange={this.textAreaChanged_textarea} value={this.state.textarea}  />
            </div>
            
            <div className='elButton'>
                <Button onClick={this.onClick_elButton} >Add</Button>
            </div>
            
            <div className='hasNestedComps elList'>
                <ul className="" style={style_elList}>
                {items_list.map((row, index) => {
                    // let itemComp = (row._componentId) ? items_list[row._componentId] : <ListItem2 dataSheetId={'listData1'} dataSheetRow={row} appActions={this.props.appActions} deviceInfo={this.props.deviceInfo} locStrings={this.props.locStrings} />;
                    // return (<li key={row.key}>{itemComp}</li>)
                })}
                <div ref={(el)=> this._elList_endMarker = el} />
                </ul>
            </div>
            </div> */}
            )
            
        </div>
        )
    }

}
export default TopicSelect;