//Start by going to https://webapp.mis.vanderbilt.edu/more/SearchClasses!input.action?carouselPanelIndex=1#

//document.getElementById("yui-pg0-0-next-link14").click();
//Deprecated, original purpose Search Classes -> Class Cart action

//wOptions=document.getElementsByClassName("classSelection");
//There is a TableData element corresponding to every class in the cart with class=="classSelection".

cart = document.getElementById("StudentCartList_div");
classes = cart.getElementsByClassName("classTable");
//There are multiple classTables within the page; specifying those within the StudentCartList_div
//restricts $classes to those tables corresponding to actual classes.
//console.log(classes);
//console.log(cart.childNodes);

for (i = 0; i < classes.length; i++) {
    //Log the iteration step.
    //console.log(i);

    classInfo = classes[i].getElementsByClassName("left")[0].childNodes;
    className = classInfo[1].innerText + " " + classInfo[3].innerText;
    /console.log(className);
    //Voodoo magic to grab the contents of the <div> containing the class name.
    
    classSelection = classes[i].getElementsByClassName("classSelection")[0];
    //console.log(classSelection);
    //Grabs the classSelection <td> associated with the class.
    //Note that if registered for multiple /sections/ of the same class, this only grabs the first section.
    //The Class Cart page is formatted to give each class its own classTable <table>, but different sections
    //of the SAME class are placed as classSelection <td>s within a single classTable <table>.

    sub = classSelection.childNodes;
    //console.log(sub);
    //This grabs the childNode tree of the accessed TableData element, which contains 7 elements:
    //0: text ; 1: input ; 2: text ; 3: input.waitListHidden ; 4: text ; 5: div.enrollmentMenuDiv ; 6: text
    //The only relevant elements are [1], [3], [5].
    //[1] and [3] are inputs to enroll and/or waitList in the class; 5 is the 3rd parent of the ▼ dropdown text.
    //Not 100% sure why there are two associated inputs, but the following behavior is known:
    //    Clicking E▼ removes the "disabled" attribute from both, but does NOT toggle the waitListHidden input true.
    //    Clicking W▼ does the same, but DOES toggle the waitListHidden input true.
    //    Registering for a full class WITHOUT toggling the waitListHidden input true does NOT give a waitlist message.
    //    Registering for a full class WHEN toggling the waitListHidden input true DOES give a waitlist message.
    //    * In both attempts, an error of failure to enroll in the class is thrown, as would be expected.
    //Thus HIGHLY LIKELY that [1] and [3] are enrollment and waitlist inputs, e.g.:
    //    try {register-for-class(this) if [1]} catch {waitlist-for-class(this) if [3]}
    //The first code revision, however, was perfectly functional and only enabled the first input. Its ability to
    //handle waitlisting was not specifically tested.

    try
    {
        sub[1].removeAttribute("disabled");
        sub[3].removeAttribute("disabled");
        sub[3].value = "true";
        
        buttonText = sub[5].firstChild.firstChild.firstChild;
        buttonText.textContent = "W▼";
        //This accesses and modifies the dropdown text. While not necessary for this script to be
        //functional, that its it serves as
        //visual confirmation that the function has executed properly.
        //firstChild returns a read-only element; textContent references the actual string in the CSS
        //console.log(buttonText.textContent);

        //console.log("Trying to enrollwaitlist for: " + className);
    }
    catch(TypeError)
    {
        console.log("Error during " + i +"-th iteration:");
        console.log(TypeError);
    }
    //This enables the inputs.
    //console.log(sub[1]);
    //console.log(sub[3]);

    
    //console.log(buttonText);
}

document.getElementById("enrollButton-button").click();