// loading / error / empty helpers

export function Loader({ label = "Loading..." }) {
  return <p className="status-message status-loading">{label}</p>;
}

export function ErrorMessage({ message }) {
  return (
    <p className="status-message status-error">
      Something went wrong: {message}
    </p>
  );
}

export function EmptyState({ message = "Nothing to show here yet." }) {
  return <p className="status-message status-empty">{message}</p>;
}
