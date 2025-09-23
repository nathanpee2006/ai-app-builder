export function validateDescription(description) {
  if (!description || description.trim().length === 0) {
    throw new Error("Please provide a valid description.");
  }
  if (description.trim().length < 20) {
    throw new Error("Description must be at least 20 characters long.");
  }
  if (description.trim().length > 1000) {
    throw new Error("Description must be less than 1000 characters.");
  }
}
