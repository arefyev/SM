using System.Web.Optimization;

namespace StaffManagement
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui.js",
                        "~/Scripts/spin.min.js",
                        "~/Scripts/jquery.ext.js",
                        "~/Scripts/jquery-postjson.js",
                        "~/Scripts/handlebars-v4.0.5.js"
                      ));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/Scripts/common.js",
                      "~/Scripts/pageManager.js",
                      "~/Scripts/pageController.js",
                      "~/Scripts/tree.js",
                      "~/Scripts/Home/page.js",
                      "~/Scripts/Staff/page.js",
                      "~/Scripts/Staff/staffInfo.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/Fonts/fontawesome/css/font-awesome.min.css",
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
