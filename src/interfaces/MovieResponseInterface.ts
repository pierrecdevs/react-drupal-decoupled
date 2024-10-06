// Base JSON:API response interface using generics for attributes
export interface JsonApiResponse<T> {
  jsonapi: JsonApi;
  data: JsonApiData<T>[]; // Movie-specific data will go here
  included?: IncludedItem[];
  links: Links;
}

// Metadata about the JSON:API version
export interface JsonApi {
  version: string;
  meta: { links: Links };
}

// Hyperlinks structure for self-referencing URLs
export interface Links {
  self: { href: string };
}

// Generic data structure for API response with dynamic attributes (T)
export interface JsonApiData<T> {
  type: string;
  id: string;
  links: Links;
  attributes: T; // Movie-specific or any other content attributes
  relationships: MovieRelationships; // Relationships specific to the movie node
}

// Relationships for the Movie content type
export interface MovieRelationships {
  node_type: Relationship;    // Generic relationship
  revision_uid: Relationship;  // Related to revision user
  uid: Relationship;           // Related to author user
  field_poster?: Relationship; // Optional field for poster (media)
}

// Generic relationship structure
export interface Relationship {
  data: DataReference;
  links: Links;
}

// Reference to related data (e.g., user, media)
export interface DataReference {
  type: string;
  id: string;
  meta?: { drupal_internal__target_id: string | number };
}

// Now, define the attributes specifically for MovieContentNode
export interface MovieContentNode {
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  revision_timestamp: string;
  status: boolean;
  title: string;
  created: string;
  changed: string;
  promote: boolean;
  sticky: boolean;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  path: { alias: string | null; langcode: string }; // Simplified path structure
  body: BodyContent;
  field_director: string;
  field_running_time: string;
  field_synopsis: SynopsisContent;
  field_year: number;
}

// Movie-specific body content
export interface BodyContent {
  value: string;
  format: string;
  processed: string;
  summary: string;
}

// Synopsis field for the movie node
export interface SynopsisContent {
  value: string;
  format: string;
  processed: string;
}

// Included items such as media or related resources
export interface IncludedItem {
  type: string;
  id: string;
  attributes: IncludedAttributes;
  relationships?: { bundle: Relationship; field_media_image?: Relationship };
  links?: Links;
}

// Media file attributes for included items
export interface IncludedAttributes {
  drupal_internal__mid: number;
  filename?: string;
  uri?: { value: string; url: string };
  filemime?: string;
  filesize?: number;
}

// Type alias for the movie API response
export type MovieApiResponse = JsonApiResponse<MovieContentNode>;
