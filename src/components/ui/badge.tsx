import type { ReactNode } from "react";

type BadgeVariant = "success" | "info" | "warning" | "error" | "reward";

type BadgeProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant: BadgeVariant;
};

export function Badge({ children, icon, variant }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}
