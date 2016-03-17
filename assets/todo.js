/*
 * @author Shaumik "Dada" Daityari
 * @copyright December 2013
 */

/* Some info
 Using newer versions of jQuery and jQuery UI in place of the links given in problem statement
 All data is stored in local storage
 User data is extracted from local storage and saved in variable todo.data
 Otherwise, comments are provided at appropriate places
 */


var todo = todo || {},
    //@TODO: obtener el objeto y parsearlo pista: se llama todoData
    data = ;

data = data || {};

(function(todo, data, $) {

    var defaults = {
        todoTask: "todo-task",
        todoHeader: "task-header",
        todoDate: "task-date",
        todoDescription: "task-description",
        taskId: "task-",
        formId: "todo-form",
        dataAttribute: "data",
        deleteDiv: "delete-div"
    }, codes = {
        "1" : "#pending",
        "2" : "#inProgress",
        "3" : "#completed"
    };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        // Adding drop function to each category of task
        $.each(codes, function (index, value) {
            //@TODO: usar drop
            $(value).usoalgunafuncion({
                drop: function (event, ui) {
                    var element = ui.helper,
                        css_id = element.attr("id"),
                        id = css_id.replace(options.taskId, ""),
                        object = data[id];

                    // Removing old element
                    removeElement(object);

                    // Changing object code
                    object.code = index;

                    // Generating new element
                    generateElement(object);

                    // Updating Local Storage
                    data[id] = object;
                    //@TODO: es hora de guardar en localStorage en el objeto todoData la data

                    // Hiding Delete Area
                    $("#" + defaults.deleteDiv).hide();
                }
            });
        });

        // Adding drop function to delete div
        $("#" + options.deleteDiv).droppable({
            drop: function(event, ui) {
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),
                    object = data[id];

                // Removing old element
                removeElement(object);

                // Updating local storage
                delete data[id];
                //@TODO: es hora de guardar en localStorage en el objeto todoData la data

                // Hiding Delete Area
                $("#" + defaults.deleteDiv).hide();
            }
        })

    };

    // Add Task
    var generateElement = function(params){
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

        //@TODO: darle la responsabilidad de movible al objeto
        wrapper.muevelo({
            start: function() {
                //@TODO: al empezar que se muestre usar .....
                $("#" + defaults.deleteDiv).mostrar();
            },
            stop: function() {
                //@TODO: al terminar que se oculte usar .....
                $("#" + defaults.deleteDiv).oculto();
            },
            revert: "invalid",
            revertDuration : 200
        });

    };

    // Remove task
    var removeElement = function (params) {
        //@TODO: remover elemento usando la api de jquery
        $("#" + defaults.taskId + params.id).unafuncion();
    };

    todo.add = function() {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, title, description, date, tempData;

        if (inputs.length !== 4) {
            return;
        }

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;

        if (!title) {
            generateDialog(errorMessage);
            return;
        }

        id = new Date().getTime();

        tempData = {
            id : id,
            code: "1",
            title: title,
            date: date,
            description: description
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(tempData);

        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Messaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                title: title,
                id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };

        responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };

    todo.clear = function () {
        todo.clear = function () {
            data = {};
            //@TODO: hacer un seteo de todoData con data vacio

            //remueve todas las tareas del drag and drop.
            $("." + defaults.todoTask).remove();
        };
    };

})(todo, data, jQuery);