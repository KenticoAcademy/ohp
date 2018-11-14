import { DeliveryClient } from 'kentico-cloud-delivery';
import { kenticoProjectId } from '../ohp.config';

export const KenticoClient = new DeliveryClient({
  projectId: kenticoProjectId,
});
