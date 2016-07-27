using System;
using System.Web;

namespace StaffManagement.Common
{
    /// <summary>
    /// Represents interface to storage data to cache for performance
    /// </summary>
    public interface ICacheService
    {
        T Get<T>(string cacheId, Func<T> getItemCallback, bool forceUpdate = false) where T : class;
        void Push<T>(string cacheId, T item) where T : class;
        T Get<T>(string cacheId) where T : class;
    }

    public class InMemoryCache : ICacheService
    {
        /// <summary>
        /// Stores a data from callback
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheId"></param>
        /// <param name="getItemCallback">Items to store</param>
        /// <param name="forceUpdate"></param>
        /// <returns></returns>
        public T Get<T>(string cacheId, Func<T> getItemCallback, bool forceUpdate) where T : class
        {
            // HttpRuntime.Cache is thread safe
            var item = HttpRuntime.Cache.Get(cacheId) as T;
            if (forceUpdate || item == null)
            {
                item = getItemCallback();
                HttpRuntime.Cache.Insert(cacheId, item, null, DateTime.Now.AddMinutes(Constants.AbsoluteCacheExpiration),
                                         System.Web.Caching.Cache.NoSlidingExpiration);
            }
            return item;
        }
        /// <summary>
        /// Stores a data
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheId"></param>
        /// <param name="item"></param>
        public void Push<T>(string cacheId, T item) where T : class
        {
            HttpRuntime.Cache.Remove(cacheId);
            HttpRuntime.Cache.Insert(cacheId, item, null, DateTime.Now.AddMinutes(Constants.AbsoluteCacheExpiration),
                                         System.Web.Caching.Cache.NoSlidingExpiration);
        }
        /// <summary>
        /// Returns an item from cache
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheId"></param>
        /// <returns></returns>
        public T Get<T>(string cacheId) where T : class
        {
            return HttpRuntime.Cache.Get(cacheId) as T;
        }
    }
}