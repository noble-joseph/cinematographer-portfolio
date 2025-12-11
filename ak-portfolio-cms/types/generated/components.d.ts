import type { Schema, Struct } from '@strapi/strapi';

export interface ValuesTags extends Struct.ComponentSchema {
  collectionName: 'components_values_tags';
  info: {
    displayName: 'tags';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'values.tags': ValuesTags;
    }
  }
}
