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
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <MyAwesomeReactComponent />
      </MuiThemeProvider>
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
    var index = e.target.getAttaribute("data-index");
    rows.splice(index,1);
    this.props.change(rows);
    this.setState({
      changenum:-1
    });
  },
  handleChange:function(e) {
    var index = e.target.getAttribute("data-index");
    var msg = this.props.todo[index];
    this.setState({
      changenum: index,
      changevalue: msg.item
    });
  },
  handleText:function(e) {
      this.setState({

          changevalue:e.target.value
      })
  },
  handleFinished:function(e) {
    var rows = this.props.todo;
    var index=  e.target.getAttribute("data-index");
    var item = this.props.todo[index];
    item.isFinished  = !item.isFinished;
    this.props.change(rows);
    this.setState({
       changenum:-1
    });
  },
  handleSave:function() {

    var inputDom = this.refs.inputnew;
    var newthing = inputDom.value.trim();
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
                    <li>
                      <input type = "text" ref = "inputnew" value ={this.state.changevalue} onChange = {this.handleText}/>
                      <button onClick ={this.handleSave}>OK</button>
                    </li>
                  )
              }else {
                if (item.isFinished) {
                    return(
                      <li>
                        <span className = "ItemText" onClick={this.handleFinished} data-index ={i}>{item.item}</span>
                        <button onClick ={this.handleChange} data-index={i}>edit</button>
                      </li>
                    );
                }else {
                  return(
                    <li>

                      <span onClick= {this.handleFinished} data-index = {i}>{item.item}</span>
                      <button onClick={this.handleChange} data-index={i}>edit</button>
                    </li>
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
        <button onClick = {this.handleDeleteFinished}>deleteOldData</button>
      );
    }
});

ReactDOM.render(
  <TodoList/>,document.body
);
