using System;
using System.Web.Mvc;

namespace StaffManagement.Controllers
{
    public class PageController : Controller
    {
        public ActionResult MainPage()
        {
            return PartialView();
        }

        public ActionResult StaffPage()
        {
            return PartialView();
        }

        public ActionResult Person(string id)
        {
            return PartialView("StaffPage", Guid.Parse(id));
        }
    }
}