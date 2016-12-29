
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" />
    <FlatButton label="Primary" primary={true} />
    <FlatButton label="Secondary" secondary={true} />
    <FlatButton label="Disabled" disabled={true} />
  </div>
);

export default FlatButtonExampleSimple;

// import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
//
// const style = {
//   margin: 12,
// };
//
//
//
// export default class RaiseBtn extends React.Component{
//    render(){
//      return(
//        <div>
//          <RaisedButton label="Default" style={style} />
//          <RaisedButton label="Primary" primary={true} style={style} />
//          <RaisedButton label="Secondary" secondary={true} style={style} />
//          <RaisedButton label="Disabled" disabled={true} style={style} />
//          <br />
//          <br />
//          <RaisedButton label="Full width" fullWidth={true} />
//        </div>
//      );
//    }
// }

// const RaisedButtonExampleSimple = () => (
//   <div>
//     <RaisedButton label="Default" style={style} />
//     <RaisedButton label="Primary" primary={true} style={style} />
//     <RaisedButton label="Secondary" secondary={true} style={style} />
//     <RaisedButton label="Disabled" disabled={true} style={style} />
//     <br />
//     <br />
//     <RaisedButton label="Full width" fullWidth={true} />
//   </div>
// );
//
// export default RaisedButtonExampleSimple;
