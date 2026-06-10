export const normalizeLessonStatus = (
  status: string,
): "completed" | "in-progress" | "locked" => {
  switch (status?.toLowerCase().trim()) {
    case "done":
    case "completed":
      return "completed";

    case "unlocked":
    case "in-progress":
    case "in progress":
    case "inprogress":
      return "in-progress";

    case "locked":
    default:
      return "locked";
  }
};
export const normalizeChapterStatus = (
  status: string,
): "completed" | "in-progress" | "upcoming" => {
  switch (status?.toLowerCase().trim()) {
    case "done":
    case "completed":
      return "completed";

    case "unlocked":
    case "in-progress":
    case "in progress":
    case "inprogress":
      return "in-progress";

    case "locked":
    case "upcoming":
    default:
      return "upcoming";
  }
};
