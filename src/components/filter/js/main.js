import React, { Component } from "react";
import '../css/main.scss'
import { FORMERR } from "dns";






class Filter extends Component {

constructor(props) {
    super(props)    

}

  componentDidMount() {

    function filter() {
      const domClassNamesForFilters = [];
      domClassNamesForFilters.push('card__assemblyStatus-text');
      domClassNamesForFilters.push('card__info-review-status-text');

      // console.log(domClassNamesForFilters);
      // console.log(document.getElementsByClassName(domClassNamesForFilters[0])[0].textContent);
      // console.log(document.getElementsByClassName(domClassNamesForFilters[1])[0].textContent);
      
      const cardsDOM = document.getElementsByClassName('card');

      let cardsFilter = [];

      // console.log(cardsFilter);

      let clickedElemenst = document.getElementsByClassName('menu-item_clicked');
      let filterWords = [];
      // console.log("clicked Elements\n");
      // console.log(clickedElemenst);
      for(let i =0; i< clickedElemenst.length;i++) {

        let filterWord = clickedElemenst[i].textContent;

        if(filterWord === "Review Finished") {
          filterWord = "Finished";
        }

        if(filterWord === "Solved") {
          filterWord = "Simulation Finished";
        }


        filterWords.push(filterWord);
      }
      // console.log('\nfilterWords\n');
      // console.log(filterWords);
      for(let i = 0; i< cardsDOM.length;i++) {
          cardsFilter.push(new Object);

          cardsFilter[i].show = new Array(filterWords.length);

          for(let j = 0; j < filterWords.length; j++) {
            cardsFilter[i].show[j] = true;
          }

          cardsFilter[i].DOM = cardsDOM[i];
      }


      // console.log('\ncardsFilter\n');
      // console.log(cardsFilter);
      
      for(let i=0; i<filterWords.length;i++) {
        if(filterWords[i] !== "Any") {
            for(let j = 0; j < cardsFilter.length; j++) {              
                  
                  let wordInDOM = cardsFilter[j].DOM.getElementsByClassName(domClassNamesForFilters[i])[0].textContent;

                  if(wordInDOM !== filterWords[i]) {
                    // console.log('***************************************************\n');
                    // console.log(wordInDOM);
                    // console.log(filterWords[i]);
                    // console.log(g);
                    cardsFilter[j].show[i] = false;  
                  } else {
                    console.log('Any');
                    cardsFilter[j].show[i] = true;
                  } 
            }
        }
      }


      // console.log('\ncardsFilter2\n');
      // console.log(cardsFilter);


      // for(let i=0;i<cardsFilter.length;i++) {
        
      //     if(cardsFilter[i].show[0]  && cardsFilter[i].show[1]) {
            
      //       console.log('\nShow\n');
      //       console.log(cardsFilter[i]);
      //     } else {
      //       console.log('\nNo-show\n');
      //       console.log(cardsFilter[i]);
      //     }
      // }
      console.log('******CardsFilter*****\n');
      console.log(cardsFilter);

      for(let i =0; i<cardsFilter.length;i++) {
        let showBlock = true;

        for(let j=0; j<cardsFilter[i].show.length; j++) {    
          if(cardsFilter[i].show[j] === false) {
            // console.log('\nNo-Show\n');
            // console.log(cardsFilter[i]);
            cardsFilter[i].DOM.style.display = "none";
            showBlock = false;
          } 
        }

        if(showBlock === true) {
          cardsFilter[i].DOM.style.display = "flex";
        }

      }



    }

    // let $filter = this;    

    // function filterKeys(filterWords) {
    //         const domClassNamesForFilters = new object;
    //         domClassNamesForFilters.statText = 'card__info-review-status-text';
    //         domClassNamesForFilters.assemblyStat = 'card__assemblyStatus-text';

    //  }

    //  Review: string Review
    //  1) DRAFT black
    //  2) SIMULATION_NEGATIVE red
    //  3) SIMULATION_POSITIVE green
    //  4) SIMULATION_REQUESTED black
     
    //  reviewStatus: string Review Status
    //  1)SOLVED
     
    //  assemblyStatus: 
    //  1)REVIEW_FINISHED white string Finished
    //  2)IN_REVIEW yellow string in Review



    function menuItemClickFunc() {


      let clickedELements = this.parentElement.getElementsByClassName('menu-item_clicked');
      clickedELements[0].classList.remove('menu-item_clicked');

      // console.log(this.textContent);
      this.classList.add("menu-item_clicked");

      filter();
    }


    const menuArr = document.getElementsByClassName('filter__menu');

    for(let i =0; i< menuArr.length; i++) {
      let menuItems = menuArr[i].getElementsByClassName('filter__menu-item');
      menuItems[0].classList.add("menu-item_clicked");
      for(let j =0; j<menuItems.length;j++) {
        menuItems[j].addEventListener("click", menuItemClickFunc);
      }

    }

  }


    

  render() {
    return (
        <div className = "filter" ref="">
            <h1 className = "filter__title">Filter</h1>
            <ul className = "filter__menu">
              <h5 className = "filter__menu-title">Assembly</h5>
              <li className = "filter__menu-item">Any</li>
              <li className = "filter__menu-item">In Review</li>
              <li className = "filter__menu-item">Review Finished</li>
            </ul>
            <ul className = "filter__menu">
              <h5 className = "filter__menu-title">Review</h5>
              <li className = "filter__menu-item">Any</li>
              <li className = "filter__menu-item">Draft</li>
              <li className = "filter__menu-item">Solved</li>
              <li className = "filter__menu-item">Simulation Requested</li>
              <li className = "filter__menu-item">Simulation Positive</li>
              <li className = "filter__menu-item">Simulation Negative</li>
            </ul>
        </div>
     )
  }
}


  export default Filter;
  