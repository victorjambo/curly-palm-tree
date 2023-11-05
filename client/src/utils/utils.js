export const findChatsInChannels = (channels, id) => {
  const channel = channels.find((channel) => channel.id === id);
  return channel?.chats ?? [];
};

export function updateChatsInChannel(channels, channelId, chat) {
  const updatedChannels = channels.map((channel) => {
    if (channel.id === channelId) {
      return {
        ...channel,
        chats: [...channel.chats, chat],
      };
    } else {
      return channel;
    }
  });

  return updatedChannels;
}
