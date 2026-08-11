export interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  anchor?: string;
  externalUrl?: string;
  expanded?: boolean;
  badge?: string;
  badgeVariant?: "neutral" | "info" | "success" | "warn";
  children?: MenuItem[];
}
