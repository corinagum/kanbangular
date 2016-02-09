(function (){
  function TaskService() {
     var tasks = [];

    this.getTasks = function() {
      return tasks;
    };

    this.addTask = function(task) {
      var nextId = tasks.length + 1;
      task.id = nextId;
      tasks.push({
        id : "Task-ID #" + nextId,
        title : task.title,
        priority : task.priority,
        status : "To Do",
        createdBy : task.creator,
        description : task.description,
        assignedTo : task.assignedTo
      });
    };

    this.nextStatus = function(task) {
      if(task.status === "To Do") {
        task.status = "In Progress";
      } else {
        task.status = "Done";
      }
    };
  }
  angular.module('app')
    .service("TaskService", TaskService);
})();