import React from 'react';
import './Search.css';
import { BootstrapTable, TableHeaderColumn, dateFormatter } from 'react-bootstrap-table';
import * as appConfig from './../Config/Config';
import * as actions from '../redux/Action/homeAction';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onFilter(event.target.value);
      }

     componentWillMount() {

        const {actions, formdate} = this.props;
      }

    onSaveRange(){
        const {actions, formdate} = this.props;
    }

    onTestFunc(e){
        const {history, formdate, actions}=this.props
        history.push('/Test/');
        //actions.onChatStart()
    }


    render() {
        const {history, formdate, actions}=this.props
                var options = {
            onRowClick: function(row, target){
                //debugger;
                //actions.navigateToChart(row);
                history.push('/Search');
            }
        }
        return (
            <div className="coins-details-container">
                <div className="coin-title"><h3>Ticket Search System</h3>
                </div>
                <div className="coins-details"> 
                     <BootstrapTable data={formdate.coins} options={options}  striped={true} hover={true}>
                          <TableHeaderColumn dataField="name" filter={ { type: 'RegexFilter', placeholder: 'Name' } } isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                          <TableHeaderColumn dataField="hotelName" filter={ { type: 'RegexFilter', placeholder: 'HotelName' } } dataSort={true}>HotelName</TableHeaderColumn>
                          <TableHeaderColumn dataField='arrivalDate' dataFormat={ dateFormatter } filter={ { type: 'DateFilter' } }>ArrivalDate</TableHeaderColumn>
                          <TableHeaderColumn dataField='departureDate' dataFormat={ dateFormatter } filter={ { type: 'DateFilter' } }>DepartureDate</TableHeaderColumn>
                      </BootstrapTable>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state, ownProps)
    return {
        formdate: state
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
