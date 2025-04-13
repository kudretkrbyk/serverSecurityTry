const sanitizeInput = (input) => {
  return input.replace(/[^\w\s]/gi, ""); // Temel SQL injection önlemi
};
module.exports = {
  sanitizeInput,
};
