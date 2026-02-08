import "../styles/protection.css";

/**
 * ProtectedImage - A wrapper component that protects images from casual downloading.
 *
 * Protection includes:
 * - Transparent overlay blocks right-click on <img> element
 * - CSS prevents drag-and-drop
 * - CSS prevents text selection tricks
 *
 * @param {Object} props - All props are passed to the inner <img>
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} [props.className] - Additional class names for the image
 * @param {string} [props.wrapperClassName] - Additional class names for the wrapper
 * @param {Function} [props.onLoad] - Image load handler
 * @param {Function} [props.onError] - Image error handler
 * @param {string} [props.loading] - Loading attribute (e.g., "lazy")
 */
function ProtectedImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  onLoad,
  onError,
  loading,
  ...rest
}) {
  return (
    <div className={`protected-image-wrapper ${wrapperClassName}`.trim()}>
      <img
        src={src}
        alt={alt}
        className={`protected-image ${className}`.trim()}
        onLoad={onLoad}
        onError={onError}
        loading={loading}
        {...rest}
      />
    </div>
  );
}

export default ProtectedImage;
