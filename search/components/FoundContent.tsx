import { connectStateResults, Hits } from 'react-instantsearch-dom';
import * as React from "react";

export const FoundContent = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query
      ? <Hits/>
      : <div/>
);
