type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  initials: string;
  name: string;
  size?: AvatarSize;
};

export function Avatar({ initials, name, size = "md" }: AvatarProps) {
  return (
    <span
      className={`avatar avatar--${size}`}
      role="img"
      aria-label={`${name} profile`}
    >
      {initials}
    </span>
  );
}
