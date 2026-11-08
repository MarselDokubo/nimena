import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";

type Action = {
  href: string;
  label: string;
  icon?: IconName;
  variant?: "primary" | "secondary" | "outline";
};

export function ServiceIntro({
  eyebrow,
  title,
  description,
  actions = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Action[];
}) {
  return (
    <section className="service-intro">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actions.length > 0 && (
        <nav aria-label={`${title} actions`}>
          {actions.map((action) => (
            <Link
              className={`button button--${action.variant ?? "outline"}`}
              href={action.href}
              key={action.label}
            >
              {action.icon && <Icon name={action.icon} />}
              {action.label}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}

export function MetricStrip({
  items,
}: {
  items: Array<{ label: string; value: string; note: string; icon: IconName }>;
}) {
  return (
    <section className="metrics-grid institutional-metrics" aria-label="Service summary">
      {items.map((item) => (
        <article className="metric-card" key={item.label}>
          <div className="metric-card__top">
            <span>{item.label}</span>
            <span className="metric-card__icon"><Icon name={item.icon} /></span>
          </div>
          <strong>{item.value}</strong>
          <small>{item.note}</small>
        </article>
      ))}
    </section>
  );
}

export function FeatureGrid({
  items,
}: {
  items: Array<{
    title: string;
    description: string;
    meta?: string;
    icon: IconName;
    href?: string;
    action?: string;
  }>;
}) {
  return (
    <section className="institutional-feature-grid">
      {items.map((item) => {
        const content = (
          <>
            <span className="institutional-feature__icon"><Icon name={item.icon} /></span>
            {item.meta && <small>{item.meta}</small>}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.action && <strong>{item.action} <Icon name="arrow" /></strong>}
          </>
        );

        return item.href ? (
          <Link className="institutional-feature" href={item.href} key={item.title}>{content}</Link>
        ) : (
          <article className="institutional-feature" key={item.title}>{content}</article>
        );
      })}
    </section>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`.trim()}>
      <div className="panel__head">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
      <div className="panel__body">{children}</div>
    </section>
  );
}
