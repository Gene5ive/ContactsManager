ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",

    events: {
      "click": "highlightName",
      "click": "printModel",
      "click button.js-delete": "deleteClicked"
    },

    highlightName: function(e){
      e.preventDefault();
      this.$el.toggleClass("warning");
    },

    printModel: function(e){
      e.preventDefault();
      console.log("Highlighting toggled on model: ", this.model)
    },

    deleteClicked: function(e){
      e.stopPropagation();
      this.trigger("contact:delete", this.model);
    },

    remove: function(){
      var self = this;
      this.$el.fadeOut(function(){
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
    childView: List.Contact,
    childViewContainer: "tbody"
  });
});
