import {DeliveryClient, TypeResolver} from 'kentico-cloud-delivery';
import {kenticoProjectId, previewApiKey} from '../ohp.config';
import {Author} from "../models/author";
import {Callout} from "../models/callout";
import {CodeInline} from "../models/code__inline_";
import {CodeExampleExternal} from "../models/code_example__external_";
import {Configuration} from "../models/configuration";
import {ContentSwitcher} from "../models/content_switcher";
import {Document} from "../models/document";
import {EmbeddedContent} from "../models/embedded_content";
import {Home} from "../models/home";
import {Instructions} from "../models/instructions";
import {NavigationCategory} from "../models/navigation_category";
import {NavigationItem} from "../models/navigation_item";
import {ReleaseNotes} from "../models/release_notes";
import {Signpost} from "../models/signpost";
import {SignpostLink} from "../models/signpost_link";

const typeResolvers = [
  new TypeResolver('author', () => new Author()),
  new TypeResolver('callout', () => new Callout()),
  new TypeResolver('code__inlite', () => new CodeInline()),
  new TypeResolver('code_example__external_', () => new CodeExampleExternal()),
  new TypeResolver('configuration', () => new Configuration()),
  new TypeResolver('content_switcher', () => new ContentSwitcher()),
  new TypeResolver('document', () => new Document()),
  new TypeResolver('embedded_content', () => new EmbeddedContent()),
  new TypeResolver('home', () => new Home()),
  new TypeResolver('instructions', () => new Instructions()),
  new TypeResolver('navigation_category', () => new NavigationCategory()),
  new TypeResolver('navigation_item', () => new NavigationItem()),
  new TypeResolver('release_notes', () => new ReleaseNotes()),
  new TypeResolver('signpost', () => new Signpost()),
  new TypeResolver('signpost_links', () => new SignpostLink())
];

export const KenticoClient = new DeliveryClient({
  projectId: kenticoProjectId,
  previewApiKey: previewApiKey,
  enablePreviewMode: true,
  typeResolvers: typeResolvers
});
