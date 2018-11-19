import {DeliveryClient, TypeResolver} from 'kentico-cloud-delivery';
import {Document} from '../models/document';
import {NavigationItem} from '../models/navigation_item';
import {kenticoProjectId, previewApiKey} from '../../ohp.config';

const typeResolvers = [
  new TypeResolver('document', () => new Document()),
  new TypeResolver('navigation_item', () => new NavigationItem())
];

export const KenticoClient = new DeliveryClient({
  projectId: kenticoProjectId,
  previewApiKey: previewApiKey,
  enablePreviewMode: true,
  typeResolvers: typeResolvers
});
