export type MenuHeading = { heading: string };

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  externalUrl?: string;
  expanded?: boolean;
  badge?: string;
  badgeVariant?: 'neutral' | 'info' | 'success' | 'warn';
  children?: MenuItem[];
};
