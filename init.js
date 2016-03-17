var availableTags = [
    "Susana",
    "Mirtha",
    "Moria",
    "Nestor",
    "Kristina",
    //@TODO:completar con nombres de proceres argentinos
];

//@TODO: usar autocomplete de jquery
$( "#tags" ).usarautocomplete({
    source: availableTags
});

//@TODO: que tenga un coso que lanze un calendario
$( "#datepicker" ).algocalendario;
$( "#datepicker" ).conestasopciones("option", "dateFormat", "dd/mm/yy");

//@TODO: que pueda ser dropeable
$(".task-container").algo;

//@TODO: que pueda ser draggeable con revert valid y revertduration de 200
$(".todo-task").algo;
todo.init();