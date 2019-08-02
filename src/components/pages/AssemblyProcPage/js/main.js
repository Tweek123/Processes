import React from 'react';
import { connect } from 'react-redux';
import  Card  from "../../../card/js/main.js"
import  Filter  from "../../../filter/js/main.js"
import { getUsers } from '../../../../actions/actions'
import '../css/main.scss';

class AssemblyProcPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            refresh: false
        }
        
    }

    componentWillMount() {
        // console.log('AssemblyProcPage');
        this.props.dispatch(getUsers());

    }

    sortDate() {
        //const processTime = Date.parse(this.props.process.updated.split(' ')[0]);
        this.props.processes.sort(this.compareNumbers)
    }

    compareNumbers(a, b) {
        // console.log("COMPARENUMBERS");
        // console.log(a.updated);
        return Date.parse(b.updated.split(' ')[0]) - Date.parse(a.updated.split(' ')[0]);
      }

    render()  {
        this.sortDate();
        this.processes = this.props.processes;
        var Cards = [];
        for(let i=0; i < this.processes.length; i++) {
            Cards.push(<Card process = {this.processes[i]}/>)
        }
        let $this = this;


        return <div className='page'>
                    <Filter processes = {this.processes}/>
                    <div className='cards'>
                        {Cards}
                    </div>
                </div>
      }
}


const mapStateToProps = (state) => {

    return {
        processes: state.reducer.processes
    };

  };

  export default connect(mapStateToProps)(AssemblyProcPage);




