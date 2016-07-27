(function ($) {

    var entityStartOffset = 5,
        entityDepthStep = 10;

    $.widget("da.tree",
    {
        options: {
            service: null,
            folderTemplate: '<script id="entity-folder-template" type="text/x-handlebars-template">' + '<li obj_id="{{obj_id}}" class="padd entity-item" data-type="folder"><div class="folder-div" title="{{name}}" style="padding-left:{{depth}}px"><div class="pointer"><i class="fa fa-plus"></i></div><div class="folder-logo"><i class="fa {{folderIcon}}"></i></div><div class="entity-name">{{name}}</div><input type="text" class="entity-edit-name" name="entity-edit-name" id="entity-edit-name" style="display:none;" /></div><ol class="children" style="display:none;"></ol></li>' + '</script>',
            itemTemplate: '<script id="entity-folder-template" type="text/x-handlebars-template">' + '<li obj_id="{{obj_id}}" class="padd entity-item" data-type="item"><div class="item-div" title="{{name}}" style="padding-left:{{depth}}px"><div class="img fa {{itemIcon}}" style="background-image:url(\'{{item_url}}/{{iconSize}}\')"></div><div class="entity-name">{{name}}</div></div></li>' + '</script>',
            objIdAttribute: "obj_id",
            needFilter: true,
            folderIcon: "fa-folder",
            itemIcon: "fa-user",
            defaultIconSize: 24,
            placeHolder: "Type text to search"
        },

        _create: function () {
            this.rendered = false;

            this._contentTreeDiv = $("<ol class='content-container-tree'" + this.options.objIdAttribute + "='0'></ol>", this.element);

            if (this.options.needFilter)
                $(this.element).append($("<div class='filter-container'><input type='text' class='filter-criteria' placeholder='" + this.options.placeHolder + "' /></div>", this.element));

            $(this.element).append(this._contentTreeDiv);

            this.initData();
            this.initEvents();
        },

        initData: function () {
            var self = this;

            if (self.options.service) {
                var spinner = new CommonResources.Spinner($(this.element), 10);
                self.options.service.loadTreeData([spinner]).done(function (data) {
                    self._renderTree(data.items, 0, self._contentTreeDiv);
                    self.rendered = true;
                    self.element.trigger('dataLoaded');// not used in this context, but comfortably
                });
            }
        },

        initEvents: function () {
            var self = this;
            /* WIDGET EXTERNAL EVENTS */
            self.element.on("buildTree", function (args, data) { self._renderTree(data.treeData, 0, self._contentTreeDiv); });
            self.element.on("findItem", function (args, data) { self._findItem(data); });

            if (self.options.needFilter)
                $(".filter-criteria", this.element).on("keyup", function (e) {
                    switch (e.keyCode) {
                        case 37:// left
                        case 39:// rigth
                        case 38:// up
                        case 40:// down
                            break;
                        default:
                            var textToFind = $(e.target).val();
                            self._filterTree(function (index, elem) {
                                var name = $(elem).find(".entity-name").html().toLowerCase();
                                return name.indexOf(textToFind.toLowerCase()) > -1;
                            });
                            break;
                    }
                });
            /* END OF EXTERNAL EVENTS */
        },

        _onItemClick: function (e) {
            var self = this;
            var target = $(e.currentTarget);
            var entityDiv = $(e.currentTarget);
            var obj = entityDiv.data("entity");

            if (entityDiv.data("entityType") === CommonResources.TreeEntityType.Item)
                $("[" + self.options.objIdAttribute + "!='" + obj.id + "']:not(.disabled)").removeClass("selected");

            this.element.trigger("clickItem", obj);

            $("li:not(:has(> .folder-div))", this.element).removeClass("active");
            target.addClass("active");

        },

        _onExpandCollapse: function (e) {
            var target = $(e.currentTarget);
            var entityDiv = target.parent();

            if (!entityDiv.hasClass("expanded")) {
                if (typeof entityDiv.data("loaded") === "undefined") {
                    entityDiv.addClass("expanded");
                    entityDiv.data("loaded", true);
                    entityDiv.find(".children").first().slideDown("fast");
                } else {
                    entityDiv.find(".children").first().slideDown("fast");
                    entityDiv.addClass("expanded");
                }
            } else {
                entityDiv.find(".children").first().slideUp("fast", function () { });
                entityDiv.removeClass("expanded");
                entityDiv.removeData("loaded");
            }

            $(".pointer .fa", target.parent().children().first()).toggleClass("fa-plus").toggleClass("fa-minus");

            e.preventDefault();
            e.stopPropagation();
        },

        _renderTree: function (data, depth, parentDiv) {
            if (data) {
                parentDiv.data('entity', data);
                for (var i = 0, n = data.length; i < n; ++i) {
                    var item = this._renderItem(data[i], depth, parentDiv);
                    if (data[i].type === CommonResources.TreeEntityType.Folder) {
                        this._renderTree(data[i].children, depth + 1, item.find(".children").first());
                    }
                }
            }
        },

        _renderItem: function (entity, depth, parentDiv) {
            var entityHtml;

            if (entity.type === CommonResources.TreeEntityType.Folder) {
                entityHtml = $(this._compileHtml(CommonResources.TreeEntityType.Folder, { "name": entity.name, "obj_id": entity.id, "depth": depth * entityDepthStep + entityStartOffset, folderIcon: this.options.folderIcon, iconSize: this.options.defaultIconSize })).data("depth", depth).data("entityType", entity.Type);
                entityHtml.find("> .folder-div").on("click.tree", $.proxy(this._onExpandCollapse, this));

            } else {
                var itemIcon = this.options.itemIcon + (entity[this.options.isActiveField] ? " active" : "");
                entityHtml = $(this._compileHtml(CommonResources.TreeEntityType.Item, { "name": entity.name, "obj_id": entity.id, "depth": depth * entityDepthStep + entityStartOffset, itemIcon: itemIcon, "item_url": entity.url })).data("entityType", entity.Type);
                entityHtml.on("click.tree", $.proxy(this._onItemClick, this));
            }

            entityHtml.data("entity", entity);

            if (entity.type === CommonResources.TreeEntityType.Folder) {
                var lastFolderElt = parentDiv.children("li.entity-item[data-type='folder']:last");
                if (lastFolderElt.length !== 0) {
                    entityHtml.insertAfter(lastFolderElt);
                } else {
                    entityHtml.prependTo(parentDiv);
                }
            } else {
                entityHtml.appendTo(parentDiv);
            }
            return entityHtml;
        },

        _compileHtml: function (templateType, data) {
            var template = this._templateHtml(templateType);
            var compiled = template(data);

            return compiled;
        },

        //item template
        _templateHtml: function (templateName) {
            var source;
            switch (templateName) {
                case CommonResources.TreeEntityType.Item:
                    source = $(this.options.itemTemplate).html();
                    break;
                case CommonResources.TreeEntityType.Folder:
                    source = $(this.options.folderTemplate).html();
                    break;
            }
            if (source == null)
                throw "Invalid type";

            var template = Handlebars.compile(source);
            return template;
        },

        _findItem: function (objId) {
            var self = this;

            this._checkAvailability(self, function () {

                var item = $("li[" + self.options.objIdAttribute + "='" + objId + "']");

                if (item.length) {
                    var parents = item.parents('[' + self.options.objIdAttribute + ']');
                    // expand
                    parents.each(function (index, entityDiv) {
                        entityDiv = $(entityDiv);
                        var entityId = entityDiv.attr(self.options.objIdAttribute);
                        if (entityId) {
                            entityDiv.find("> .children").slideDown("fast", function () { });
                            entityDiv.addClass("expanded");
                            entityDiv.find('> .folder-div .pointer .fa').removeClass("fa-plus").addClass("fa-minus");
                        }
                    });
                    // load a selected entity
                    item.click();
                }
            });
        },

        _filterTree: function (filterFunc) {
            var self = this,
                found = $(this.element).find("li").filter(filterFunc),
                ids = self._findIds(found);

            $.each($(this.element).find("li"), function (ind, elem) {
                if ($.inArray($(elem).attr(self.options.objIdAttribute), ids) === -1) {
                    var isChildFound = false;
                    for (var idx in ids) {
                        if (($(elem).find("li[" + self.options.objIdAttribute + "=\"" + ids[idx] + "\"]")).length > 0) {
                            isChildFound = true;
                            break;
                        }
                    }
                    if (!isChildFound) {
                        $(elem).slideUp();
                    }
                }
            });

            // show all item that match search criteria
            $.each(found, function (ind, elem) {
                $(elem).slideDown();
                // show parent too
                var parentGroup = $(elem).parent().closest(".entity-item");
                if (parentGroup.length > 0) {
                    $(parentGroup[0]).slideDown();
                    self._showHideParent(parentGroup, true);
                }
            });
        },

        _findIds: function (data) {
            var self = this;
            var ids = [];
            $.each(data, function (ind, elem) { ids.push($(elem).closest(".entity-item").attr(self.options.objIdAttribute)); });
            return ids;
        },

        _showHideParent: function (elem, isShow) {
            var parentGroup = $(elem).parent().closest(".entity-item");
            if (parentGroup.length > 0) {
                if (isShow) {
                    $(parentGroup[0]).slideDown();
                } else {
                    $(parentGroup[0]).slideUp();
                }
                this._showHideParent(parentGroup, isShow);
            }
        },

        _checkAvailability: function (context, callback) {
            //instead of this, better to create observer...
            if (!context.rendered)
                setTimeout(function () { context._checkAvailability(context, callback); }, 200);
            callback.call(context);
        },

        _destroy: function () {
            this._contentTreeDiv.find("*").off();
        }
    });

})(jQuery);