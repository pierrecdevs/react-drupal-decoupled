export interface FileIncludedInterface {
    type: string;
    id: string;
    links: {
      self: {
        href: string;
      };
    };
    attributes: {
      drupal_internal__fid: number;
      langcode: string;
      filename: string;
      uri: {
        value: string;
        url: string;
      };
      filemime: string;
      filesize: number;
      status: boolean;
      created: string;
      changed: string;
    };
    relationships: {
      uid: {
        data: {
          type: string;
          id: string;
          meta: {
            drupal_internal__target_id: number;
          };
        };
        links: {
          related: {
            href: string;
          };
          self: {
            href: string;
          };
        };
      };
    };
  }
  