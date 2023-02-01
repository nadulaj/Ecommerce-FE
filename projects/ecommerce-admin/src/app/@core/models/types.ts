export type MenuItemType = {
  title?: string;
  icon?: string;
  route?: string;
  heading?: boolean;
  divider?: boolean;
  children?: Array<any>;
};

export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
};

export type DomainType = {
  created_by?: string;
  created_on?: string;
  id?: number;
  name?: string;
  domain?: string;
  description?: string;
  is_active?: number;
  is_published: number;
  updated_by?: string;
  updated_on?: string;
};

export type TemplateAttributesType = {
  temp_id?: number;
  id?: number;
  name: string;
  description: string;
  is_active?: number;
  is_delete?: number;
};

export type TemplateType = {
  [key: string]: any;
  created_by?: string;
  created_on?: string;
  id?: number;
  name: string;
  url: string;
  description: string;
  image?: any;
  is_active: number;
  is_published?: number;
  template_attributes?: TemplateAttributesType[];
  custom_attributes?: TemplateAttributesType[];
  updated_by?: string;
  updated_on?: string;
};
