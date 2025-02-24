POST /api/users/register  // Register a new user
POST /api/users/login     // Login user
GET /api/users/:id        // Get user details


POST /api/channels/create   // Create a new channel (Auth required)
GET /api/channels/:id       // Fetch channel details
PATCH /api/channels/:id     // Update channel info
DELETE /api/channels/:id    // Delete a channel


POST /api/videos/upload     // Upload a new video
GET /api/videos/:id         // Get video details
PATCH /api/videos/:id       // Edit video details
DELETE /api/videos/:id      // Delete a video
