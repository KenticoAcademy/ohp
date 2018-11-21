import { adminApiKey, searchAppId } from "../../ohp.config";
import * as algoliasearch from 'algoliasearch';

export const searchClient = algoliasearch(
  searchAppId,
  adminApiKey,
);
