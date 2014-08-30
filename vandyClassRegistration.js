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
  document.getElementById("p1").innerHTML="W▼";
}

document.getElementById("enrollButton-button").click();

<button type="button" id="yui-gen35-button">W▼</button>


wOptions=document.getElementsByClassName("classSelection");
//there is a TableData element corresponding to every class in the cart with class=="classSelection"

for (var i = 0; i < wOptions.length; i++) {
    //console.log(i);   //log the iteration step
    //console.log(wOptions[i]);   //log the TableData element being accessed
    sub = wOptions[i].childNodes;    //grab the childNodes of the accessed TableData element
    //console.log(sub);    //log the childNodes
    //There are 7 elements in the childNodes tree:
    //0: text ; 1: input ; 2: text ; 3: input.waitListHidden ; 4: text ; 5: div.enrollmentMenuDiv ; 6: text
    //The only relevant elements are [1], [3], [5].
    //[1] and [3] are inputs that say we want to waitList the class; 5 is the 3rd parent of the ? dropdown text.
    //Don't know why there are two associated inputs. 

    sub[1].removeAttribute("disabled");
    //This enables the first input.
    //console.log(sub[1]);

    sub[3].removeAttribute("disabled");
    //This enables the second input.
    sub[3].value = "true";
    console.log(sub[3]);
    console.log("bleep---------------------------------");
    buttonText = sub[5].firstChild.firstChild.firstChild;
    console.log(buttonText.textContent);
    buttonText.textContent = "W▼";
    console.log(buttonText);
    //sub[5].firstElementChild.firstElementChild.firstElementChild.innerHTML=
    //console.log(sub[5].firstElementChild.firstElementChild.firstElementChild);
}