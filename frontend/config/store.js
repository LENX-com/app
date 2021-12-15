import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduxSearch} from 'redux-search'
import { persistStore } from 'redux-persist';
import SearchApi from "@/utils/searchApi"
import thunk from "redux-thunk";
import rootReducer from "@/redux/reducers";
import setAuthToken from "@/utils/setAuthToken";

const initialState = {};
const isClient = typeof window !== 'undefined';
const middleware = [thunk];
const enhancer = composeWithDevTools(
  reduxSearch({
    resourceIndexes: {
      order: ["name", "address"]
    },
    resourceSelector: (resourceName, state) => {
      return state.order[resourceName];
    },
    searchApi : new SearchApi()
  }),
  applyMiddleware(...middleware),
  );
  let store;
  
  //create store to persist state
  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      enhancer
    );

     store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      enhancer
    );
  }

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;

