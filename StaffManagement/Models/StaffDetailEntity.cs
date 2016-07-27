using System;

namespace StaffManagement.Models
{
    /// <summary>
    /// Contains a detail entity
    /// </summary>
    public sealed class StaffDetailEntity
    {
        #region - Properties -
        /// <summary>
        /// Entity id
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Detail/value
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// Type
        /// </summary>
        public StaffDetailType Type { get; set; }
        #endregion
    }
}