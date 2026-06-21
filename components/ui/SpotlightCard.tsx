"use client";

import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useRef,
} from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

type Props =
  | (CommonProps & {
      as?: "div";
      onClick?: () => void;
      onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
      role?: string;
      tabIndex?: number;
      ariaLabel?: string;
    })
  | (CommonProps & {
      as: "button";
      onClick?: () => void;
      onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
      ariaLabel?: string;
    });

/** Direct port of React Bits SpotlightCard (pure CSS-var pattern).
 *  Mousemove writes --mouse-x/y; the ::before pseudo paints a radial gradient.
 *  Focus also triggers the spotlight centered on the card. */
export function SpotlightCard(props: Props) {
  const {
    children,
    className = "",
    spotlightColor = "rgba(255, 138, 61, 0.18)",
  } = props;
  const refDiv = useRef<HTMLDivElement | null>(null);
  const refBtn = useRef<HTMLButtonElement | null>(null);

  function handleMove(event: ReactMouseEvent<HTMLElement>) {
    const el = (props.as === "button" ? refBtn.current : refDiv.current) as
      | HTMLElement
      | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
  }

  function handleFocus() {
    const el = (props.as === "button" ? refBtn.current : refDiv.current) as
      | HTMLElement
      | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${rect.width / 2}px`);
    el.style.setProperty("--mouse-y", `${rect.height / 2}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
  }

  if (props.as === "button") {
    return (
      <button
        ref={refBtn}
        type="button"
        onMouseMove={handleMove}
        onFocus={handleFocus}
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        className={`card-spotlight ${className}`}
        aria-label={props.ariaLabel}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      ref={refDiv}
      onMouseMove={handleMove}
      onFocus={handleFocus}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      className={`card-spotlight ${className}`}
      role={props.role}
      tabIndex={props.tabIndex}
      aria-label={props.ariaLabel}
    >
      {children}
    </div>
  );
}
