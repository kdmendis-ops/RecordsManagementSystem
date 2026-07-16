exports.notFound = (req, res) => res.status(404).json({ message: `Route ${req.originalUrl} was not found` });
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
};
