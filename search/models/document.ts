import {Document} from "../../shared/models/document";

const removeMarkdown = require('remove-markdown');

export interface DocumentSearch {
    readonly content: string;
    readonly contentType: string;
    readonly shortTitle: string;
    readonly description: string;
    readonly title: string;
    readonly objectID: string;
}

export const createSearchableDocument = (documentObject: Document): DocumentSearch => {
    const content = documentObject.content && removeMarkdown(documentObject.content.value);
    const description = documentObject.description && documentObject.description.value;
    const contentType = documentObject.contentType && documentObject.contentType.value;
    const shortTitle = documentObject.shortTitle && documentObject.shortTitle.value;
    const title = documentObject.title && documentObject.title.value;
    const codename = documentObject.system.codename;

    return {
        content,
        description,
        contentType,
        shortTitle,
        title,
        objectID: codename,
    }
};
