export default function NotificationDetailsById({ notification,getSubjectById}: any) {

  return (
    <>
    <h2 className="text-2xl font-bold">Notification Details</h2>
    <div className="p-6 rounded-xl  custom-surface space-y-5">
      <h2 className="text-2xl font-bold">
        {notification?.title}
      </h2>

      <p className="text-muted-foreground">
        {notification?.message}
      </p>

      <div className="space-y-2 text-sm">

        <p className="text-yellow-600">
          <b>XP Earned:</b>{" "}
          {notification?.metadata?.xpEarned || 0}
        </p>

        <p>
          <b>Subject:</b>{" "}
          {getSubjectById(
            notification?.metadata?.subjectId
          )?.title || "Unknown"}
        </p>

        <p>
          <b>Type:</b> {notification?.type}
        </p>

        <p>
          <b>Status:</b>{" "}
          {notification?.isRead ? "Read" : "Unread"}
        </p>

        <p>
          <b>Date:</b>{" "}
          {new Date(notification?.createdAt).toLocaleString()}
        </p>

      </div>
    </div>
    </>
  );
}