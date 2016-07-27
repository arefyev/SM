using System.Web;
using System.Web.Http;

namespace StaffManagement.Common
{
    public abstract class DataApiController : ApiController
    {
        #region - Properties -
        protected readonly ICacheService AppCache;
        #endregion

        #region - Controllers -
        protected DataApiController()
        {
            var application = HttpContext.Current.ApplicationInstance as MvcApplication;
            if (application != null) AppCache = application.AppCache;
        }
        #endregion
    }
}