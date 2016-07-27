using System;
using System.Collections.Generic;

namespace StaffManagement.Models
{
    /// <summary>
    /// Represents a person
    /// </summary>
    public sealed class StaffEntity
    {
        #region - Properties -
        /// <summary>
        /// Person unique id
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Name of person
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// Falmily name/Surname
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Position
        /// </summary>
        public string Position { get; set; }
        /// <summary>
        /// Sex
        /// </summary>
        public SexType Sex { get; set; }
        /// <summary>
        /// Represents all contacts of person
        /// </summary>
        public IList<StaffDetailEntity> Details { get; set; }
        #endregion
    }
}