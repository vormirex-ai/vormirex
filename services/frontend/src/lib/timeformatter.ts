export const getTimeAgo = (date: string) => {
  const now = new Date();
  const created = new Date(date);
  const diff = now.getTime() - created.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};
