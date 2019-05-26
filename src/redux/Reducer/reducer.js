
import * as actionTypes from '../ActionTypes';

const initialObj = {
  name: '',
  hotelName: '',
  arrivalDate: '',
  departureDate:'',
  room:''
} 

const search = (state = initialObj, action) => {
  switch (action.type) {
    case actionTypes.SEARCHHOTEL:
      const change =
      {
        ...state,
        ...action
      }
      return change;
    default:      
      return state
  }
}

export default search