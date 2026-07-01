import { useState } from "react";

// initialRating/initialComment let the same form create AND edit a rating
function RatingForm({ initialRating = 5, initialComment = "", onSave }) {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (rating < 1 || rating > 10) {
      setErrorMsg("Rating must be between 1 and 10.");
      return;
    }
    if (comment.trim() === "") {
      setErrorMsg("Please add a short comment.");
      return;
    }

    setErrorMsg("");
    await onSave(rating, comment);
  }

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      {errorMsg && <p className="status-message status-error">{errorMsg}</p>}

      <label>
        Your rating (1-10)
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>

      <label>
        Your comment
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </label>

      <button type="submit">Save rating</button>
    </form>
  );
}

export default RatingForm;
