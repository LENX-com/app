
import { getSearchSelectors} from "redux-search";
import { createSelector } from "reselect";

export const resources = (state) => state.order;

export const filterdIdlist = createSelector(
  [resources],
  (resources) => resources.orders
);

export const resourceSelector = (resourceName, state) => {
  return state.order[resourceName];
};


const selectors = getSearchSelectors({
  resourceName: "orders",
  resourceSelector: resourceSelector,
});

export const dataSearchText = selectors.text;
export const filteredIdArrays = selectors.result;
export const filteredIdArray = selectors.unfilteredResult;
// export const datasearch = selectors.text;
