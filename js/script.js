const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
icons = document.querySelectorAll(".row i"),
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id)=> {
    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected = "selected";
        }
        else if(id == 1 && country_code=="hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});

exchangeIcon.addEventListener("click",()=>{
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click",()=>{
    let text = fromText.value,
    // console.log(text);
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    // console.log(text,translateFrom,translateTo); 
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        // console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        // console.log(target)
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
                // console.log("From copy icon clicked")
            }
            else{
                // console.log("to copy icon clicked")
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            // let uttrance
            // console.log("Speech icon clicked")
            let uttrance;
            if(target.id == "from"){
                uttrance = new SpeechSynthesisUtterance(fromText.value);
                uttrance.lang = selectTag[0].value;
            }
            else{
                uttrance = new SpeechSynthesisUtterance(toText.value);
                uttrance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(uttrance);
        }
    });
});