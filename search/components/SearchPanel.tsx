import * as React from "react";
import { indexName } from "../../ohp.config";
import { searchClient } from "../services/searchClient";
import { Configure, InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { FoundContent } from "./FoundContent";

export class SearchPanel extends React.PureComponent {
  render() {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
      >
        <SearchBox
          autoFocus={true}
        />
        <Configure hitsPerPage={5}/>
        <FoundContent/>
      </InstantSearch>
    );
  }
}
