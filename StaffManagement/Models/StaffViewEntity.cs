using System.Collections.Generic;

namespace StaffManagement.Models
{
    /// <summary>
    /// Represents a view person model
    /// </summary>
    public sealed class StaffViewEntity
    {
        #region - Properties -
        /// <summary>
        /// Person name
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Position
        /// </summary>
        public string Position { get; set; }
        /// <summary>
        /// Person details
        /// </summary>
        public IList<StaffGroupedDetailEntity> Details { get; set; }
        #endregion
    }
}