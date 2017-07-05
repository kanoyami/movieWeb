import React from 'react';
import SocialCardView from '../views/SocialCardView-router.js';
export default class SocialViewList extends React.Component {

constructor(props) {
    super(props);
    this.state = {datas:[]};
  }

componentWillMount = ()=>{
  fetch('./datas.json')
  .then(response => response.json())
  .then(results => {
    //console.log(results);
    this.setState({datas:results})
  })
    .catch(e => console.log("Oops, error", e))
}

render(){

  return (
    <div style={{paddingTop:'64px',paddingBottom:'50px'}}>
    {this.state.datas.map((data) =>
        <SocialCardView key={data.id}/>)}
        </div>
  )

}

}