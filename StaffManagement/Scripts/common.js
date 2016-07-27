var CommonResources = function () {
};

CommonResources.RequestState =
{
    SUCCESS: 0,
    FAIL: 1
};

CommonResources.TreeEntityType = {
    Root: 0,
    Folder: 1,
    Item: 2
};

CommonResources.StaffEntityType = {
    Phone: 0,
    Email: 1,
    Skype: 2,
    SystemLogin: 3,
    HomeAddress: 4,
    WorkAddress: 5
};

CommonResources.GetStaffDetailEntityDescription = function (type) {
    switch (type) {
        case CommonResources.StaffEntityType.Phone:
            return { title: "Phone", icon: "fa-phone" };
        case CommonResources.StaffEntityType.Email:
            return { title: "Email ", icon: "fa-envelope" };
        case CommonResources.StaffEntityType.Skype:
            return { title: "Skype", icon: "fa-skype" };
        case CommonResources.StaffEntityType.SystemLogin:
            return { title: "System account", icon: "fa-user-secret" };
        case CommonResources.StaffEntityType.HomeAddress:
            return { title: "Home address (private)", icon: "fa-home" };
        case CommonResources.StaffEntityType.WorkAddress:
            return { title: "Work address", icon: "fa-suitcase" };
        default:
            return { title: "Unknown", icon: "question-circle-o" };
    }
};

CommonResources.Spinner = function (element, radius) {
    this.radius = radius || 10;
    this.element = element;
};

CommonResources.highlightMenuItem = function (controller) {
    var url = "/" + controller;
    $("header ul.navigation li").removeClass("active");
    var $a = $("header ul.navigation li a[href$=\"#" + url + "\"]");
    $a.parent().addClass("active");
};