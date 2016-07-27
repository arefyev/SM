using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StaffManagement.Startup))]
namespace StaffManagement
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
