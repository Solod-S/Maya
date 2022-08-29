const source = document.getElementById("entry-template").innerHTML;

const template = Handlebars.compile(source);

console.log(template);
