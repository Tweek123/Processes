import React, { Component } from "react";
import Slider from "react-slick-slider";
import '../css/main.scss'






class Card extends Component {

constructor(props) {
    super(props)
    this.users = this.props.users;
}

  updateDimensions() {
    }


    

  render() {
    return (
        <div className = "card">
            
        </div>
     )
  }
}



const mapStateToProps = (state) => {
    // console.log(state.routing.search);
    return {
    cards: state.reducer.cards
    };
  };
  
  export default connect(mapStateToProps)(Card);
  