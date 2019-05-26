import React from 'react';
import 'react-dates/initialize';
import './Home.css';
import { BootstrapTable, TableHeaderColumn, dateFormatter } from 'react-bootstrap-table';
import * as appConfig from './../Config/Config';
import * as actions from '../redux/Action/homeAction';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Autosuggest from 'react-autosuggest';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import img from '../images/hotels.jpg';

function validate(name) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
  };
}

const languages = [
  {
    name: 'The Oberoi Amarvilas',
  },
  {
    name: 'Hotel Samode Palace'
  },
  {
    name: 'Taj Rambagh Palace'
  },
  {
    name: 'Oberoi Grand'
  },
  {
    name: 'Umaid Bhawan Palace'
  },
  {
    name: 'Taj Palace and Tower'
  },
  {
    name: 'Hotel Ratan Vilas'
  },
  {
    name: 'Taj Lake Palace'
  },
  {
    name: 'The Imperial Hote'
  }
];



// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = languages.filter(language => regex.test(language.name));
    
  return suggestions;
}


class Home extends React.Component {

	 constructor(props) {
      super(props);
      this.state = {
      	data: [],
      	departureDate: '',
      	arrivalDate: '',
      	value: '',
      	suggestions: [],
	    selectedOption: '',
	    name: '',
	    errors:false
      }
      // pageData = {
      //    data: [],
      //    minRange : '',
      //    maxRange : ''
      // }
    //  this.ActionOption = this.ActionOption.bind(this)
   }



  getSuggestionValue = suggestion => {   
    return suggestion.name;
  };

  renderSuggestion = suggestion => {
    return suggestion.name;
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

 componentWillMount() {

	const {actions, formdate} = this.props;

 //    return fetch(`${appConfig.default.apiRoute}/coins`, {
	// 	method: 'GET',
	// })
	// .then((res)=> {
	// 	return res.json();
	// })
	// .then(function(res){
	// 	this.setState({
	// 		data : res.result
	// 	})
	// }.bind(this))

  }



  	onChangeArrival = date => this.setState({ arrivalDate: date })
  	onChangeDeparture = date =>  this.setState({ departureDate : date })

  	onChangeHandler (e){
  		const {actions} = this.props;
  	}
  	onSaveRange(){
  		const {actions, formdate} = this.props;
  	}

  	validation = (data) => {
  		if(!this.state.name){

  		}
  	}

  	// componentWillReceiveProps (newProps){
  	// 	if(newProps.success.result.ok){
  	// 		alert('Save Range')
  	// 	}
  	// }
  	
	// onChatFunc(e){
	// 	const {history, formdate, actions}=this.props
	// 	history.push('/Chat/');
	// 	//actions.onChatStart()
	// }

	onTestFunc(e){
		const {history, formdate, actions}=this.props
		history.push('/Test/');
		//actions.onChatStart()
	}

	DetailsOption(cell, row){
	  return '<div class="chat-option" ><i class="glyphicon glyphicon-list-alt" ></i></div>';
	}

	handleChange = (selectedOption) => {
    	this.setState({ selectedOption });
	}
	onChangeName = (e) => {
		this.setState({
			name: e.target.value,
			errors: false
		})
	}

	onSearchClick = () => {
		debugger;
		var errors = validate(this.state.name);
		if(!errors.name){
			const {history, formdate, actions}=this.props
			history.push('/search');
			var arrivalDate = this.state.startDate._d.toISOString()
			var departureDate = this.state.endDate._d.toISOString()

			var obj = {
				arrival: arrivalDate,
				departure : departureDate,
				name : this.state.name,
				hotelName: this.state.value
			}
			actions.onSearchHotel(obj);
		}
		else{
			this.setState({errors : errors.name})
		}
	}

	render(){
	    const errors = this.state.errors
		const { selectedOption } = this.state;
	    const { value, suggestions } = this.state;
	    const inputProps = {
	      placeholder: "HotelName",
	      value,
	      onChange: this.onChange
	    };
		const {history, formdate, actions}=this.props
		var options = {
			onRowClick: function(row, target){
				//debugger;
				//actions.navigateToChart(row);
				history.push('/chart/'+ row.name);
			}
		}

		return (
			<div className="all" style={{ backgroundImage: `url(${img})` }} >
			<div className="coins-details-container">
				<div className="coin-title"><h3>Ticket Booking System</h3></div>
				<div className="coins-details-header">
					<div className="row">
						<div className="column">
							<input tyle="text" className={errors ? "form-control name error": "form-control name"} 
							onChange={(e)=>{this.onChangeName(e)}} 
							placeholder="Name"
							name="name"/>
							{errors ? 
							<p className="errorText">
								Please fill the name field
							</p>:"" 
							}

						</div>
						<div className="column">
					      	<Autosuggest 
								className="hotelName"		      	
						        suggestions={suggestions}
						        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						        getSuggestionValue={this.getSuggestionValue}
						        renderSuggestion={this.renderSuggestion}
						        inputProps={inputProps} 
						      />
						</div>
						<div className="coin-title">
					        <DateRangePicker
					          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
					          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
					          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
					          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
					          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
					          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
					          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
					        />					        
				        </div>

						<div className="column">
							<button type="button" className="btn btn-primary book" onClick={(e)=>{this.onSearchClick(e)}}>Book</button></div>
						</div>
				</div>
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
)(Home)

