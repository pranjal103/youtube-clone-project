const Channel = require('../Modals/channel');

exports.createChannel = async (req, res) => {
  try {
    const { userId, channelName, handle, avatar, description, channelBanner } = req.body;
    
    // Check if a channel with the same handle already exists
    const existingChannel = await Channel.findOne({ handle });
    if (existingChannel) {
      return res.status(400).json({ error: "Channel handle already exists. Please choose another." });
    }

    // Create and save the new channel
    const channel = new Channel({
      owner: userId,
      channelName,
      handle,
      avatar,
      description: description || "",
      channelBanner: channelBanner || "https://via.placeholder.com/600x200"
    });
    await channel.save();

    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    console.error("Error in createChannel:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
