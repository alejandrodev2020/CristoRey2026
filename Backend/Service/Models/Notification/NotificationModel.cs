namespace Service.Models.Notification
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public string ActionUrl { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        // Extras para UI
        public string CreatedAtText { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
    }
}
