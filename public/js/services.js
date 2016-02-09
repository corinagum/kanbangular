(function (){
  function TaskService() {
    this.tasks = [];
    this.getTasks = function() {
      return this.tasks;
    };
    this.addTask = function(task) {
      var nextId = this.tasks.length + 1;
      task.id = nextId;
      this.books.push({
        id : nextId,
        title : task.title,
        description : task.description,
        priority : task.priority
      });
    };
  }
  angular.module('app')
    .service("TaskService", TaskService);
})();