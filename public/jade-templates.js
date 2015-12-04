function genColumns(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (ids) {
var imageCount = 30 // number of img elements to generate
var imageRows = imageCount/3
var row = 0
var col = 0
var index = 0
while (row < imageRows)
{
buf.push("<div class=\"row\">");
while (col < 3)
{
buf.push("<div class=\"col-md-4\">");
var id = ids[index]
var imgClass = "artwork lazy" + id
var metaClass = "meta meta" + id
buf.push("<div class=\"art\"><a" + (jade.attr("href", "javascript:showHideDiv(\"meta"+id+"\")", true, false)) + " class=\"showMeta\"><img" + (jade.cls([imgClass], [true])) + "/></a><div" + (jade.cls([metaClass], [true])) + "></div></div></div>");
col = col + 1
index = index + 1
}
col = 0
buf.push("</div>");
row += 1
}}.call(this,"ids" in locals_for_with?locals_for_with.ids:typeof ids!=="undefined"?ids:undefined));;return buf.join("");
}