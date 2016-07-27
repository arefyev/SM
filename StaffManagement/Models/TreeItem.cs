using System;
using System.Collections.Generic;

namespace StaffManagement.Models
{
    /// <summary>
    /// Represents tree model
    /// </summary>
    public class Tree
    {
        #region - Contructor -
        public Tree()
        {
            Items = new List<TreeEntity>();
        }
        #endregion

        #region - Properties -
        public List<TreeEntity> Items { get; set; }
        #endregion
    }
    /// <summary>
    /// Represents a tree item model
    /// </summary>
    public class TreeEntity
    {
        #region - Properties -
        /// <summary>
        /// Unique item id
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Item name
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Item type
        /// </summary>
        public TreeEntityType Type { get; set; }
        /// <summary>
        /// Child elements
        /// </summary>
        public List<TreeEntity> Children { get; set; }
        #endregion
    }
    /// <summary>
    /// Tree entity type
    /// </summary>
    public enum TreeEntityType
    {
        Folder = 1,
        Entity
    }
}