import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import MyAwesomeReactComponent from './RaiseBtn';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './RaiseBtn';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const style = {
   float: 'left',
};


var TodoList = React.createClass({
  getInitialState:function() {
    return {
      todolist:[]
    };
  },
  handleChange:function(rows) {
    this.setState({
        todolist:rows
    });
  },
  render:function() {
    return(
      <div>
          <TypeNew todo = {this.state.todolist} add ={this.handleChange}/>
          <ListTodo todo = {this.state.todolist} change={this.handleChange}/>
          <DeleBtn todo = {this.state.todolist} change ={this.handleChange}/>
      </div>
    );
  }
});


var  TypeNew = React.createClass({
  getInitialState: function() {
        return {
            textFieldValue: ''
        };
    },
  handleAdd: function() {
    var inputDom = this.refs.mytextField;
    var newthing = this.state.textFieldValue;

    var rows = this.props.todo;
    if (newthing == "") {
      alert("数据不能为空");
      return;
    }
    var itemInfo = {item:newthing,isFinished: false};
    rows.push(itemInfo);
    this.props.add(rows);
    //实在想不到删除的办法了
    this.state.textFieldValue = "";
  },
  //text数据改变
  _handleTextFieldChange:function(e) {
    this.setState({
                textFieldValue: e.target.value
            });
  },
  render:function() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form>
            <TextField  value={this.state.textFieldValue} ref="mytextField" onChange={this._handleTextFieldChange} hintText="请输入内容" autoFocus/>
            <RaisedButton primary={true} label="提交" onClick = {this.handleAdd }/>
        </form>
      </MuiThemeProvider>
    );
  }
});

var ListTodo = React.createClass({
  getInitialState:function() {
    return {
        changenum:-1,
        changevalue:""
    }
  },
  handleDel:function(e) {
    var rows = this.props.todo;
    var index = e.target.getAttaribute("dataIndex");
    rows.splice(index,1);
    this.props.change(rows);
    this.setState({
      changenum:-1
    });
  },
   handleChange:function(i,e) {
    // var index = e.target.getAttribute("dataIndex");
    var msg = this.props.todo[i];
    this.setState({
      changenum: i,
      changevalue: msg.item
    });
  },
  handleText:function(e) {
      this.setState({

          changevalue:e.target.value
      });
  },
  handleFinished:function(i,e) {
    var rows = this.props.todo;
    var item = this.props.todo[i];
    item.isFinished  = !item.isFinished;
    this.props.change(rows);
    this.setState({
       changenum:-1
    });
  },
  handleSave:function() {
    var inputDom = this.refs.inputnew;
    var newthing = this.state.changevalue;
    var rows =this.props.todo;
    if (newthing == "") {
        alert("数据不能为空");
        return;
    }
    var index = this.state.changenum;
    var oldItem = rows[index];
    oldItem.item = newthing;
    rows[index] = oldItem;
    this.props.change(rows);
    this.setState({
      changenum: -1
    });
  },
  render:function() {
    return (
      <ul id= "todolist">
        {
          this.props.todo.map(function(item, i ){

              if (this.state .changenum == i) {
                  return (
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <List>
                      <TextField  value={this.state.changevalue} ref="inputnew" onChange={this.handleText} hintText="" autoFocus/>
                      <RaisedButton primary={true} label ="完成" onClick ={this.handleSave}/>
                    </List>
                    </MuiThemeProvider>
                  )
              }else {
                if (item.isFinished) {
                    return(
                      <MuiThemeProvider muiTheme={getMuiTheme()}>
                      <List>
                        <ListItem style={style} className = "ItemText" leftCheckbox={<Checkbox checked={item.isFinished}/>} onClick={this.handleFinished.bind(this,i)} dataIndex ={i} primaryText={item.item}/>
                        <RaisedButton  primary={true} label ="编辑" onClick={this.handleChange.bind(this,i)} dataIndex={i}/>
                      </List>
                      </MuiThemeProvider>
                    );
                }else {
                  return(
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <List >
                      <ListItem  style={style} leftCheckbox={<Checkbox checked={item.isFinished} />} onClick={this.handleFinished.bind(this,i)} dataIndex ={i} primaryText={item.item}/>
                      <RaisedButton  primary={true} label ="编辑" onClick={this.handleChange.bind(this,i)} dataIndex={i}/>
                    </List>
                    </MuiThemeProvider>
                  );
                }
              }
          }.bind(this))
        }
      </ul>
    );
  }
});

var DeleBtn = React.createClass({
    handleDeleteFinished:function() {
      var rows= this.props.todo;
      rows = rows.filter(function(item){
          return !item.isFinished;
      });
      this.props.change(rows);
    },
    render:function() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RaisedButton primary={true} label ="删除过期数据" onClick = {this.handleDeleteFinished}/>
        </MuiThemeProvider>
      );
    }
});

ReactDOM.render(
  <TodoList/>,document.body
);
