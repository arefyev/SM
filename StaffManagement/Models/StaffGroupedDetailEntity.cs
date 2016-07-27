using System.Collections.Generic;

namespace StaffManagement.Models
{
    /// <summary>
    /// Contains grouped by type details for person
    /// </summary>
    public class StaffGroupedDetailEntity
    {
        #region - Properties -
        /// <summary>
        /// Type to group
        /// </summary>
        public StaffDetailType Type { get; set; }
        /// <summary>
        /// Grouped values
        /// </summary>
        public List<string> Values { get; set; }
        #endregion

        public StaffGroupedDetailEntity()
        {
            Values = new List<string>();
        }
    }
}