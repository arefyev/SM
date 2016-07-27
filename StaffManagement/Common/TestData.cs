using System;
using System.Collections.Generic;
using StaffManagement.Models;

namespace StaffManagement.Common
{
    /// <summary>
    /// Very primitive test data to demonstrate application
    /// </summary>
    public static class TestData
    {
        #region - Methods -
        /// <summary>
        /// Emulates staff data
        /// </summary>
        /// <returns></returns>
        public static List<StaffEntity> GetStaffData()
        {
            return new List<StaffEntity>
            {
                new StaffEntity {FirstName = "Amanda", LastName = "Stern", Position = "Secretary", Sex = SexType.Female, Id = Guid.Parse("{950C4979-31DF-4BE8-9D0A-453C3866B68A}"),Details = new List<StaffDetailEntity>
                {
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "amanda.stern@example.com",Type= StaffDetailType.Email},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "+18005550176",Type= StaffDetailType.Phone},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "+49005550176",Type= StaffDetailType.Phone},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "ama.stern",Type= StaffDetailType.SystemLogin},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "Deutschland, Ingolstadt, Schumannstr 21",Type= StaffDetailType.WorkAddress},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "Deutschland, Munich",Type= StaffDetailType.HomeAddress}
                } },
                new StaffEntity {FirstName = "Jeff", LastName = "Bridges", Position = "Manager", Sex = SexType.Male, Id = Guid.Parse("{B5EF0A08-0465-47AF-BD63-BB0B4FF4CD4C}"),Details = new List<StaffDetailEntity>
                {
                     new StaffDetailEntity{Id = Guid.NewGuid(),Value = "jeff.bridges@example.com",Type= StaffDetailType.Email},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "jeff.bridges.007",Type= StaffDetailType.Skype},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "+190083467",Type= StaffDetailType.Phone},
                    new StaffDetailEntity{Id = Guid.NewGuid(),Value = "Deutschland, Hamburg, Neustr 78",Type= StaffDetailType.WorkAddress},
                }},
                new StaffEntity
                {
                    FirstName = "Aaron", LastName = "Locker", Position = "CEO", Sex = SexType.Male, Id = Guid.Parse("{E97121D8-48CF-4221-9F63-B383B58112FC}"),Details = new List<StaffDetailEntity>
                    {
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "aaron.locker@example.com",Type= StaffDetailType.Email},
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "+18005550170",Type= StaffDetailType.Phone},
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "+49005550170",Type= StaffDetailType.Phone},
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "aa.locker",Type= StaffDetailType.SystemLogin},
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "aa.locker.ceo",Type= StaffDetailType.Skype},
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "Deutschland, Ingolstadt, Schumannstr 21",Type= StaffDetailType.WorkAddress},
                        new StaffDetailEntity{Id = Guid.NewGuid(),Value = "Deutschland, Ingolstadt",Type= StaffDetailType.HomeAddress}
                    }

                }
            };
        }
        /// <summary>
        /// Emulates staff tree
        /// </summary>
        /// <returns></returns>
        public static Tree GetTreeData()
        {
            return new Tree
            {
                Items = new List<TreeEntity>
                {
                    new TreeEntity {Id = Guid.Parse("{B5EF0A08-0465-47AF-BD63-BB0B4FF4CD4C}"), Name = "Jeff Bridges", Type = TreeEntityType.Entity},
                    new TreeEntity {Id = Guid.Parse("{950C4979-31DF-4BE8-9D0A-453C3866B68A}"), Name = "Amanda Stern", Type = TreeEntityType.Entity},
                    new TreeEntity {Id = Guid.Parse("E08D84C1-0429-4EEA-A9EF-2314EA1C96FF"), Name = "Administration", Type = TreeEntityType.Folder,
                        Children = new List<TreeEntity>{new TreeEntity {Id = Guid.Parse("{E97121D8-48CF-4221-9F63-B383B58112FC}"), Name = "Aaron Locker", Type = TreeEntityType.Entity}}}
                }
            };
        }
        #endregion
    }
}