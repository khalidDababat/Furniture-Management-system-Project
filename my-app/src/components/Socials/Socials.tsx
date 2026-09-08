import type { Company } from "@/types";

const FB = (
  <svg viewBox="0 0 24 24" width="17" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
  </svg>
);
const IG = (
  <svg viewBox="0 0 24 24" width="17" fill="currentColor" aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1012 18.6 6.6 6.6 0 0012 5.4zm0 10.9a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm6.8-11.2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);
const IN = (
  <svg viewBox="0 0 24 24" width="17" fill="currentColor" aria-hidden="true">
    <path d="M6.9 8.4H3.6V21h3.3V8.4zM5.3 3a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM21 21h-3.3v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9.9V8.4h3.1v1.7h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V21z" />
  </svg>
);

export default function Socials({
  socials,
  anchorClass = "",
}: {
  socials: Company["socials"];
  anchorClass?: string;
}) {
  return (
    <>
      <a className={anchorClass} href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">{FB}</a>
      <a className={anchorClass} href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">{IG}</a>
      <a className={anchorClass} href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{IN}</a>
    </>
  );
}
