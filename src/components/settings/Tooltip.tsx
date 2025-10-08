"use client";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingNode,
  FloatingPortal,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { gsap } from "gsap";
import {
  cloneElement,
  type FC,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";
import { twJoin, twMerge } from "tailwind-merge";

export type TooltipProps = {
  title: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any> & { ref?: RefObject<HTMLElement> };
  placement?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  disableHoverListener?: boolean;
  disableFlip?: boolean;
  className?: string;
  disabled?: boolean;
};

const Tooltip: FC<TooltipProps> = ({
  children,
  title,
  placement: initialPlacement = "top",
  showArrow = false,
  enterDelay = 200,
  leaveDelay = 0,
  disableHoverListener,
  disableFlip = false,
  className,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  // Subscribe this component to the <FloatingTree> wrapper if it exists
  const nodeId = useFloatingNodeId();

  const { refs, floatingStyles, context, placement, middlewareData } =
    useFloating({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      strategy: "fixed",
      placement: initialPlacement,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(6),
        !disableFlip &&
          flip({
            padding: 6,
            fallbackAxisSideDirection: "start",
          }),
        shift({
          padding: 6,
        }),
        arrow({
          element: arrowRef,
        }),
        size({
          padding: 8,
        }),
      ],
    });

  // Event listeners to change the open state
  const hover = useHover(context, {
    move: false,
    delay: {
      open: enterDelay,
      close: leaveDelay,
    },
    enabled: !disableHoverListener,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  const referenceProps = getReferenceProps() as {
    "aria-describedby": string | undefined;
    onBlur: (e: FocusEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    onMouseLeave: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onPointerDown: (e: PointerEvent) => void;
    onPointerEnter: (e: PointerEvent) => void;
  };

  const childProps = {
    ref: (node: HTMLElement) => {
      refs.setReference(node);
      const childrenRef = children.props.ref;
      if (typeof childrenRef === "function") {
        childrenRef(node);
      } else if (childrenRef) {
        (childrenRef as RefObject<HTMLElement | null>).current = node;
      }
    },
    "aria-describedby": referenceProps["aria-describedby"],
    onBlur: (e: FocusEvent) => {
      referenceProps.onBlur?.(e);
      children.props.onBlur?.(e);
    },
    onFocus: (e: FocusEvent) => {
      referenceProps.onFocus?.(e);
      children.props.onFocus?.(e);
    },
    onKeyDown: (e: KeyboardEvent) => {
      referenceProps.onKeyDown?.(e);
      children.props.onKeyDown?.(e);
    },
    onMouseLeave: (e: MouseEvent) => {
      referenceProps.onMouseLeave?.(e);
      children.props.onMouseLeave?.(e);
    },
    onMouseMove: (e: MouseEvent) => {
      referenceProps.onMouseMove?.(e);
      children.props.onMouseMove?.(e);
    },
    onPointerDown: (e: PointerEvent) => {
      referenceProps.onPointerDown?.(e);
      children.props.onPointerDown?.(e);
    },
    onPointerEnter: (e: PointerEvent) => {
      referenceProps.onPointerEnter?.(e);
      children.props.onPointerEnter?.(e);
    },
  };

  const onEnter = () => {
    if (!refs.floating.current) return;
    gsap.fromTo(
      refs.floating.current,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }
    );
  };

  const onExit = () => {
    if (!refs.floating.current) return;
    gsap.to(refs.floating.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
    });
  };

  if (disabled) return children;

  return (
    <>
      {cloneElement(children, childProps)}
      <Transition
        in={!!title && isOpen}
        appear={true}
        timeout={{ enter: 0, exit: 250 }}
        nodeRef={refs.floating}
        mountOnEnter={true}
        unmountOnExit={true}
        onEntered={onEnter}
        onExit={onExit}
      >
        <FloatingNode id={nodeId}>
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className={twMerge(
                "bg-grey-100 z-9999 h-fit max-w-80 rounded-sm px-2 py-1 text-sm leading-snug font-medium text-white opacity-0 shadow-sm select-none",
                placement === "top" && "origin-bottom",
                placement === "bottom" && "origin-top",
                placement === "left" && "origin-right",
                placement === "right" && "origin-left",
                className
              )}
            >
              {title}
              {showArrow && (
                <div
                  ref={arrowRef}
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y,
                  }}
                  className={twJoin(
                    "bg-grey-100 absolute size-2 rotate-45",
                    placement === "top" && "-bottom-1",
                    placement === "bottom" && "-top-1",
                    placement === "left" && "-right-1",
                    placement === "right" && "-left-1"
                  )}
                />
              )}
            </div>
          </FloatingPortal>
        </FloatingNode>
      </Transition>
    </>
  );
};

export default Tooltip;
