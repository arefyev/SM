using System;
using System.Collections.Generic;
using System.Linq;
using StaffManagement.Common;
using StaffManagement.Models;

namespace StaffManagement.Providers
{
    public sealed class StaffProvider : IStaffProvider
    {
        #region - Properties -
        /// <summary>
        /// Cache for the performance
        /// </summary>
        private readonly ICacheService _cacheService;
        /// <summary>
        /// Stores persons
        /// </summary>
        private List<StaffEntity> StaffData
        {
            get { return _cacheService.Get("staff", TestData.GetStaffData); }
        }
        /// <summary>
        /// Stores tree hierarchy
        /// </summary>
        private Tree TreeData
        {
            get { return _cacheService.Get("tree", TestData.GetTreeData); }
        }
        #endregion

        #region - Contructors -
        public StaffProvider(ICacheService cacheService)
        {
            _cacheService = cacheService;
        }
        #endregion

        #region - Methods -
        /// <summary>
        /// Returns all persons
        /// </summary>
        /// <returns></returns>
        public List<StaffEntity> LoadAllStaff()
        {
            return StaffData;
        }
        /// <summary>
        /// Returns tree hierarchy
        /// </summary>
        /// <returns></returns>
        public Tree LoadStaffTree()
        {
            return TreeData;
        }
        /// <summary>
        /// Returns a certain person if exists
        /// </summary>
        /// <param name="id">Person id</param>
        /// <returns></returns>
        public StaffEntity FindCertainStaff(Guid id)
        {
            return StaffData.SingleOrDefault(x => x.Id.Equals(id));
        }
        #endregion
    }
}