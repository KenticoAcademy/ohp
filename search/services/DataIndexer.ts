import { KenticoClient } from "../../shared/services/KenticoClient";
import * as algoliasearch from "algoliasearch";
import { adminApiKey, indexName, searchAppId } from "../../ohp.config";
import { Document } from "../../shared/models/document";
import { createSearchableDocument } from "../models/document";

export class DataIndexer {
  private _algoliaClient = algoliasearch(searchAppId, adminApiKey);
  private index = this._algoliaClient.initIndex(indexName);

  addDocumentObjects = () => {
    KenticoClient
      .items<Document>()
      .getObservable()
      .subscribe(response => this.indexData(response.items));
  };

  private indexData = (data: Document[]) => {
    const json = Array();

    data.forEach(document => {
      if (document && document.content && document.content.value) {
        const documentObject = createSearchableDocument(document);
        if (documentObject.content && documentObject.description && documentObject.title) {
          json.push(documentObject);
        }
      }
    });

    this.index.saveObjects(json);
  }
}
