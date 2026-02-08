import { useEffect } from "react";

/**
 * Hook to prevent context menu and drag on images within a container.
 * Applied to container elements that contain protected images.
 *
 * @param {React.RefObject} containerRef - Ref to the container element
 */
export function useImageProtection(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleContextMenu = (e) => {
      // Prevent context menu on images and protected wrappers
      if (
        e.target.tagName === "IMG" ||
        e.target.closest(".protected-image-wrapper")
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e) => {
      // Prevent dragging images
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    container.addEventListener("contextmenu", handleContextMenu);
    container.addEventListener("dragstart", handleDragStart);

    return () => {
      container.removeEventListener("contextmenu", handleContextMenu);
      container.removeEventListener("dragstart", handleDragStart);
    };
  }, [containerRef]);
}

export default useImageProtection;
