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
      prefetch={false}
    >
      <Image
        alt=""
        className="brand-lockup__image"
        height={268}
        priority
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sikap-logo-cropped.png`}
        width={274}
      />
    </Link>
  );
}
