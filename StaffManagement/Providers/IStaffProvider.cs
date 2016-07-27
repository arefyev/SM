using System;
using System.Collections.Generic;
using StaffManagement.Models;

namespace StaffManagement.Providers
{
    public interface IStaffProvider
    {
        List<StaffEntity> LoadAllStaff();

        Tree LoadStaffTree();

        StaffEntity FindCertainStaff(Guid id);
    }
}
