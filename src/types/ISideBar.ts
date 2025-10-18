export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  isOpen?: boolean;
  hasChildren?: boolean;
  arrowIcon?: React.ReactNode; // ✅ add this line
}

export interface SidebarSubItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}