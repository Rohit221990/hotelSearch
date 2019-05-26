import * as appConfig from '../../Config/Config';
import * as action from '../Action';
import { RSAA } from 'redux-api-middleware'; // RSAA = '@@redux-api-middleware/RSAA'



export const onSearchHotel = (data) => {
  debugger;

  return (dispatch) => {
     fetch(``, {
      method: 'GET',
    })
    .then((res)=> {
      return res.json();      
    })
    .then(function(res){
      dispatch(action.onSearchHotelData(res.result));
    })
    .catch((err)  => {
      console.log(err)
    })
  } 
}


// export const onChatStart = () => {
//   debugger;
//   return (dispatch) => {
//     userMessages.push(chatJson.text)
//     dispatch(action.onRequestChat(chatJson));
//   }
// }