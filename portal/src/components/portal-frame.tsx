"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { memberNavigation, secretariatNavigation } from "@/lib/demo-data";

type PortalFrameProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  role?: "member" | "secretariat";
};

export function PortalFrame({ children, eyebrow, title, role = "member" }: PortalFrameProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = role === "secretariat" ? secretariatNavigation : memberNavigation;
  const user = role === "secretariat"
    ? { name: "Ada Nwosu", detail: "Membership Officer", initials: "AN" }
    : { name: "Amina Yusuf", detail: "Graduate Member", initials: "AY" };

  return (
    <div className="portal-shell">
      <aside className={`sidebar${menuOpen ? " sidebar--open" : ""}`}>
        <div className="sidebar__head">
          <Brand />
          <button className="icon-button sidebar__close" onClick={() => setMenuOpen(false)} type="button" aria-label="Close navigation">
            <Icon name="close" />
          </button>
        </div>

        <div className="preview-label"><span /> Prototype workspace</div>

        <nav className="sidebar__nav" aria-label={`${role} navigation`}>
          <p>{role === "secretariat" ? "Secretariat" : "Member workspace"}</p>
          {nav.map((item) => {
            const active = item.href === pathname || (pathname.startsWith("/secretariat/applications") && item.label === "Applications");
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={active ? "is-active" : ""}
                href={item.href}
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                <Icon name={item.icon as IconName} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar__support">
          <Icon name="shield" />
          <div>
            <strong>Need help?</strong>
            <span>Contact Member Services</span>
          </div>
        </div>

        <div className="sidebar__user">
          <span className="avatar avatar--dark">{user.initials}</span>
          <div><strong>{user.name}</strong><small>{user.detail}</small></div>
          <Link href="/" aria-label="Leave preview"><Icon name="logout" /></Link>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <div className="portal-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} type="button" aria-label="Open navigation">
            <Icon name="menu" />
          </button>
          <div className="topbar__title">
            <span>{eyebrow}</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar__actions">
            <span className="sample-pill">Sample data</span>
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              <Icon name="bell" />
              <span />
            </button>
            <span className="avatar">{user.initials}</span>
          </div>
        </header>
        <main className="portal-content">{children}</main>
      </div>
    </div>
  );
}
