import { pageConstants } from "../actions/constants";

const initState = {
  page: {},
  loading: false,
  error: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      }
      break;

    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
  }
  return state;
}