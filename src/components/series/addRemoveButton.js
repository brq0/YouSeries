import React, { Component } from 'react';
import { firebase } from '../firebase';
import './button_style.css';

const addButton = require('./addBtn.png');
const removeButton = require('./removeButton.png');

class AddRemoveButton extends Component {

  constructor(props){
    super(props);

    this.state = {
      seriesId: props.id,
      authUser: props.authUser.uid,
      posterPath: props.posterPath,
      userSeries: 0
    }

  }


  componentDidMount() {
      firebase.app.database().ref(`items/${this.state.authUser}/`).on('value', snapshot => {
        this.setState({
          userSeries: snapshot.val()
        })
      });
  }

  addSeriesButtonClick(id, path){
    var newItem = firebase.app.database().ref(`items/${this.state.authUser}/`);
    newItem.update({ [id]: path});

    // newItem.off();
  }

  removeSeriesButtonClick(id){
    var removeItem = firebase.app.database().ref(`items/${this.state.authUser}/${id}`);
    removeItem.remove();

    // removeItem.off();
  }

  render(){
    if(this.state.userSeries !== '0'){

      if(this.state.userSeries === null){
        return <button style={{background:'transparent', border:'none'}}
                onClick={() => this.addSeriesButtonClick(this.state.seriesId, this.state.posterPath)}>
                <img src={addButton} alt="" title="Add to your series list"/></button>
      }else{


        var a = this.state.userSeries.hasOwnProperty(this.state.seriesId)
        if(a){
          return <button style={{background:'transparent', border:'none'}}
                  onClick={() => this.removeSeriesButtonClick(this.state.seriesId)}>
                  <img src={removeButton} alt="" title="Remove from your series list"/></button>
        }else{
          return <button style={{background:'transparent', border:'none'}}
                  onClick={() => this.addSeriesButtonClick(this.state.seriesId, this.state.posterPath)}>
                  <img src={addButton} alt="" title="Add to your series list"/></button>
        }
    }

    }
  }
}

export default AddRemoveButton;
