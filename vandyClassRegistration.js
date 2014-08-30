document.getElementById("yui-pg0-0-next-link14").click();

wOptions=document.getElementsByClassName("waitListHidden");
var list = [];
for (var i = 0; i < wOptions.length; i++) {
    list.push(i);
}
//console.log(wOptions);
for(var i=0; i<list.length; i++) {
  //console.log(i);
  name = "enrollmentRequestItems[" + i +"].classNumber";
  //console.log(name);
  document.getElementsByName(name)[0].removeAttribute("disabled");
  //console.log(wOptions[i]);
  wOptions[i].removeAttribute("disabled");
  wOptions[i].value = "true";
}

document.getElementById("enrollButton-button").click();