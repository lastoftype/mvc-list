jQuery(document).ready(function($) {

  var availableTags = [
    'running',
    'swimming',
    'jumping'
  ];

  var ActionList = Spine.Model.sub();
  ActionList.configure("ActionList", "actions");
  ActionList.extend(Spine.Model.Local);

  var list = new ActionList();
  list.actions = availableTags;

  function setUpTags() {
    $("#tags").autocomplete({
      source: list.actions
    });
  }

  function updateTags() {
    $('#tags').autocomplete("option", {
      source: list.actions
    });
  }

  function addToTags(tag){

  }

  function runaway() {
    console.log('asdas');
  }

  /**
   * Action Model
   *
   * @return {Object} object
   */
  var Action = Spine.Model.sub();
  Action.configure("Action", "action_title", "action_rating");
  Action.extend(Spine.Model.Local);
  Action.fetch();
  Action.bind('refresh', runaway);

  var actionItem = new Action();

  var actions = Action.all();
	var action;
	var _len;

	for (var _i = 0, _len = actions.length; _i < _len; _i++) {
	  
	  // get var
	  action = actions[_i];
	  
	  // push to array
	  list.actions.push(action.action_title);
	  
	  console.log('pushed: '+action.action_title);
	}



  /**
   * Action controller
   * 
   * Good place to refactor
   */
  var ActionController = Spine.Controller.sub({
    elements: {
      ".item": "item",
      "input[type='text']": "input"
    },
    events: {
      "click .btn-primary": "addToList"
    },
    init: function() {
      // alert(actionItem.action_title);
      var data = {};
      setUpTags();
      firstAction = Action.all();
      console.table(firstAction);
    },
    saveLocal: function(obj) {
      var action = obj;
      action.save();
      console.log('updated: ' + action.action_title);
    },
    addToList: function() {
      
      // Get val
      var value = this.input.val();
      
      // Add to list of tags
      list.actions.push(value);
      
      // Update list of tags
      updateTags();

      // Create action
      var action = Action.create({
        action_title: value,
        action_rating: 10
      });

      // Save locally
      this.saveLocal(action);

      updateTags();
    }
  });

  /**
   * Ailment view
   */
  var ActionView = function(model) {
    this.model = model;
    return this;
  };

  /**
   * function output: output view based on viewNumber
   *
   * @return {Object} ailmentArray
   */

  // View - Output function
  ActionView.prototype.output = function(view) {
    this.view = view;
    this.dir = './app/assets/mustache/';
    this.file = this.view + '.mst';
    this.path = this.dir + this.file;
    var path = this.path;
    var model = this.model;
    // Mustache code
    $.get(path, function(template) {
      var rendered = Mustache.render(template, model);
      $('#target').html(rendered);
    });
  };


  // Set up app and scope
  var app = new ActionController({
    el: $(".target-wrapper")
  });

  // Get the party started
  app.init();

  Action.fetch();

});
