export interface Operation {
  is_last: boolean;
  catalog_model_title: string;
  catalog_model_slug: string;
  body: {
    id: number;
    ua: string;
    ru: string;
  };
  purpose: {
    id: number;
    ua: string;
    ru: string;
  };
  registered_at: string;
  model_year: number;
  vendor: string;
  vendor_slug: string;
  model: string;
  operation: {
    ru: string;
    ua: string;
  };
  department: string;
  color: {
    slug: string;
    ru: string;
    ua: string;
  };
  is_registered_to_company: boolean;
  address: string;
  koatuu: number;
  displacement: number;
  kind: {
    id: number;
    ru: string;
    ua: string;
    slug: string;
  };
  operation_group: {
    id: number;
    ru: string;
    ua: string;
  };
}

export interface Car {
  digits: string;
  vin: string;
  region: {
    name: string;
    name_ua: string;
    slug: string;
    old_code: string;
    new_code: string;
  };
  vendor: string;
  model: string;
  model_year: number;
  photo_url: string;
  is_stolen: boolean;
  stolen_details: any;
  operations: Operation[];
  comments: Array<{
    id: number;
    name: string;
    text: string;
    created_at: string;
    updated_at: string;
  }>;
  price?: number;
  notes?: string;
}