// Converts common MongoDB errors into safe messages for API clients.
exports.getErrorMessage = (error) => {
  if (error.code === 11000) return 'That value is already in use.';
  if (error.name === 'ValidationError') return Object.values(error.errors).map((item) => item.message).join(', ');
  return error.message || 'Database operation failed.';
};
