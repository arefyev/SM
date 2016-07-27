using System;
using System.Collections.Generic;
using System.Linq;
using StaffManagement.Models;

namespace StaffManagement.Common
{
    /// <summary>
    /// Helps to do various transformations
    /// </summary>
    public class StaffHelper
    {
        #region - Methods -
        /// <summary>
        /// Transforms Staff entity to Staff view (with grouped details)
        /// </summary>
        /// <param name="staff"></param>
        /// <returns></returns>
        public static StaffViewEntity PrepareGroupedModel(StaffEntity staff)
        {
            if (staff == null)
                return null;

            return new StaffViewEntity { Name = String.Format("{0} {1}", staff.FirstName, staff.LastName), Position = staff.Position, Details = GroupDetails(staff.Details) };
        }
        /// <summary>
        /// Groups details by type
        /// </summary>
        /// <param name="details"></param>
        /// <returns></returns>
        private static IList<StaffGroupedDetailEntity> GroupDetails(IList<StaffDetailEntity> details)
        {
            if (details == null || details.Count == 0)
                return new List<StaffGroupedDetailEntity>();

            return details.Select(x => x)
                     .GroupBy(x => x.Type)
                     .Select(
                         x =>
                         new StaffGroupedDetailEntity
                         {
                             Type = x.Key,
                             Values = x.Select(z => z.Value).ToList()
                         })
                     .ToList();
        }
        #endregion
    }
}