import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand${compact ? " brand--compact" : ""}`} href="/">
      <span className="brand__marks" aria-hidden="true">
        <Image alt="" height={52} priority src="/brand/nimena-logo.webp" width={52} />
        <span className="brand__rule" />
        <Image alt="" height={46} priority src="/brand/nse-logo.svg" width={46} />
      </span>
      <span className="brand__copy">
        <strong>NIMENA</strong>
        {!compact && <small>Member Services</small>}
      </span>
    </Link>
  );
}
