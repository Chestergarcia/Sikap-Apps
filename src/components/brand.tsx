import Link from "next/link";
import { BrandWordmark } from "@/components/brand-wordmark";

type BrandProps = {
  light?: boolean;
};

export function Brand({ light = false }: BrandProps) {
  return (
    <Link
      aria-label="Sikap home"
      className={`brand-lockup${light ? " brand-lockup--light" : ""}`}
      href="/"
      prefetch={false}
    >
      <BrandWordmark />
    </Link>
  );
}
