import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  light?: boolean;
};

export function Brand({ light = false }: BrandProps) {
  return (
    <Link
      aria-label="Sikap home"
      className={`brand-lockup${light ? " brand-lockup--light" : ""}`}
      href="/"
    >
      <Image
        alt=""
        className="brand-lockup__image"
        height={559}
        priority
        src="/sikap-logo.png"
        width={1024}
      />
    </Link>
  );
}
