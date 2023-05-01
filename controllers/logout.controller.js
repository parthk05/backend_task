const logout = async (req, res) => {
  try {
    // Clear the user's session data
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error logging out" });
      }

      // Return success response
      return res.status(200).json({ message: "User logged out successfully" });
    });
  } catch (err) {
    // Handle error
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = logout;
