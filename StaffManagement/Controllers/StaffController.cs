using System;
using System.Web.Http;
using StaffManagement.Common;
using StaffManagement.Models;
using StaffManagement.Providers;

namespace StaffManagement.Controllers
{
    public class StaffController : DataApiController
    {
        private readonly IStaffProvider _staffProvider;

        public StaffController()
        {
            _staffProvider = new StaffProvider(AppCache);
        }

        [HttpPost]
        public Tree LoadTreeData()
        {
            return _staffProvider.LoadStaffTree();
        }

        [HttpPost]
        public StaffEntity LoadStaffData(StaffFilter filter)
        {
            return _staffProvider.FindCertainStaff(Guid.Parse(filter.Id));
        }

        [HttpPost]
        public StaffViewEntity LoadViewStaffData(StaffFilter filter)
        {
            var staff = _staffProvider.FindCertainStaff(Guid.Parse(filter.Id));
            return staff == null ? null : StaffHelper.PrepareGroupedModel(staff);

        }
    }
}