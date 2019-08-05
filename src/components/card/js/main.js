import React, { Component } from "react";
import { connect } from 'react-redux';
import '../css/main.scss';

class Card extends Component {

constructor(props) {
  super(props)

  this.renderCard  = new Object;


  // this.modNames.reviewStatusNegative = 'info-review-status-text_negative';
  // this.modNames.reviewStatusPositive = 'info-review-status-text_positive';
  // this.modNames.cardAssemblyFinish = 'assemblyStatus_finish';
}


  prepareAssemblyStatus() {

    this.renderCard.assemblyStatus = new Object;

    const cardAssemblyFinish = 'assemblyStatus_finish';

    switch(this.props.process.assemblyStatus) {
    
      case 'REVIEW_FINISHED':
      this.renderCard.assemblyStatus.text = 'Finished';
      this.renderCard.assemblyStatus.mod = cardAssemblyFinish;
      break
      
      case 'IN_REVIEW':
      this.renderCard.assemblyStatus.text = 'In Review';
      this.renderCard.assemblyStatus.mod = '';
      break
    }

  }
  
  prepareReview() {
    this.renderCard.reviewStatus = new Object;

    const reviewStatusNegative = 'info-review-status-text_negative';
    const reviewStatusPositive = 'info-review-status-text_positive';
    // console.log("*************************************************\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    // console.log(this.props.process.reviewStatus);
    switch(this.props.process.reviewStatus) {

      case 'DRAFT': 
        // console.log("DRAFT\n");
        this.renderCard.reviewStatus.status = 'Draft';
        this.renderCard.reviewStatus.title = "Review"
        this.renderCard.reviewStatus.mod = ''; 
      break

      case 'SIMULATION_NEGATIVE': 
        this.renderCard.reviewStatus.status = 'Simulation Negative';
        this.renderCard.reviewStatus.title = "Review"
        this.renderCard.reviewStatus.mod = reviewStatusNegative;
      break

      case 'SIMULATION_POSITIVE': 
        // console.log("\nSIMULATION_POSITIVE\n")
        this.renderCard.reviewStatus.status = 'Simulation Positive';
        this.renderCard.reviewStatus.title = "Review"
        this.renderCard.reviewStatus.mod = reviewStatusPositive;
        // console.log(this.renderCard.reviewStatus.mod);
      break
        
      case 'SIMULATION_REQUESTED': 
        this.renderCard.reviewStatus.status = 'Simulation Requested';
        this.renderCard.reviewStatus.title = "Review"
        this.renderCard.reviewStatus.mod = '';
      break

      case 'SOLVED':
        // console.log("SOLVED\n");
        // console.log(this.props.process.reviewStatus);
        this.renderCard.reviewStatus.status = 'Simulation Finished';
        this.renderCard.reviewStatus.title = "Review Status"
        this.renderCard.reviewStatus.mod = '';
      break

    }
    
    
  }

  prepareUpdateTime() {
    this.renderCard.updateTime = new Object;

    const timeInTimeZone = Date.parse(this.props.process.updated.split(' ')[0]);
    const timeZoneStr = this.props.process.updated.split(' ')[1];
    // console.log(timeZoneStr);
    const timeZone = timeZoneStr.split(':')[0];
    // console.log(timeZone);

    const dateNow = new Date();

    const timeNow  = new Date().valueOf();

    const timeZoneHere = Math.abs(dateNow.getTimezoneOffset() / 60);

    const timeZoneDiff = (timeZoneHere - timeZone)*3.6*Math.pow(10,6); 

    const currTimeInTimeZone =  timeInTimeZone + timeZoneDiff;

    const timeDiff = timeNow - currTimeInTimeZone;

    // console.log("\ntimeInTimeZone\n"+timeInTimeZone);
    // console.log("\ntimeZone\n"+timeZone);
    // console.log("\ntimeNow\n"+timeNow);
    // console.log("\ntimeZoneHere\n"+timeZoneHere);
    // console.log("\ntimeZoneDiff\n"+timeZoneDiff );
    // console.log("\ncurrTimeInTimeZone\n"+currTimeInTimeZone);
    // console.log("\ntimeDiff\n"+timeDiff);
    // console.log("\n"+3.6*Math.exp(6));
    // console.log("\n"+this.props.process.updated.split(' ')[0]);



    if(timeDiff >= 3.6*Math.pow(10,6) || timeDiff < 0) {



      // console.log('TIME1');
      // console.log(timeDiff);
      // console.log(3.6*Math.pow(10,6));


      this.renderCard.updateTime.text = this.props.process.updated.split(' ')[0].replace('T',', ').replace('-','/').replace('-','/');
      // console.log(this.renderCard.updateTime.text.replace('-','/'));

    } else {
      // console.log('TIME2');
      // console.log(timeDiff);

      // console.log(timeDiff);
      this.renderCard.updateTime.text = Math.round(timeDiff/60000) +" minutes ago";
    }    
    
  //  "_id": "5d4193af8e993276d1193992",
  //   "img": "http://placehold.it/160x100",
  //   "age": 28,
  //   "assemblyStatus": "IN_REVIEW",
  //   "reviewStatus": "DRAFT",
  //   "title": "9: BIZMATIC v4",
  //   "updated": "2018-11-06T03:56:27 -03:00"
  }

  prepareTitle() {
    this.renderCard.title = this.props.process.title;
  }


  prepareRenderData() {
      this.prepareAssemblyStatus();
      this.prepareReview();
      this.prepareUpdateTime();
      this.prepareTitle();

      // console.log(this.props.process);
  }

  render() {




    if(this.props.process !== undefined){ 
      this.prepareRenderData();

      return (
        <div className = {"card "+this.props.process._id}>
            <div className = {"card__assemblyStatus "+ this.renderCard.assemblyStatus.mod}> <p className = "card__assemblyStatus-text ">{this.renderCard.assemblyStatus.text}</p></div>
            <div className = "card__image"></div>
            <div className = "card__info">
                <h3 className = "card__info-name">{this.renderCard.title}</h3>
                
                <div className = "card__info-review">
                  <p className = "card__info-review-text">{this.renderCard.reviewStatus.title}</p> 
                  <p className = {"card__info-review-status-text "+ this.renderCard.reviewStatus.mod}>{this.renderCard.reviewStatus.status}</p>
                </div>   

                <div className = "card__info-lastUpdates">
                  <p className = "card__info-lastUpdates-text">Last Updates</p> 
                  <p className = "card__info-lastUpdates-time-text">{this.renderCard.updateTime.text}</p>
                </div>  

            </div>

            <div className="card__buttons">
                <div className="card__buttons-edit"></div>
                <div className="card__buttons-delete"></div>
                <div className="card__buttons-viewProc">
                  <p className="card__buttons-viewProc-text">View Process</p>
                  <div className="card__buttons-viewProc-arrow"></div>
                </div>
            </div>
        </div>
     )

    } else {
      return ""
    }

  }
}



  export default Card;
  