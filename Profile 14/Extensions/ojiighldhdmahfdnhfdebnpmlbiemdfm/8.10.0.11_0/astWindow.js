var browserAPI = (typeof chrome === 'undefined' ? browser : chrome);
var AST        = AST || {};
AST.VERSION    = "PRO";

document.getElementById('copyright').innerHTML = '&copy; 2017 - ' + (new Date()).getFullYear() + ' Level Access';