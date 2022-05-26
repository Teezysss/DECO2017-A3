function queryWord(word) {
    let xhr = new XMLHttpRequest();
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    xhr.onreadystatechange = function (ev) {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            let data = JSON.parse(this.responseText);
            console.log(data);
            let container = document.querySelector(".right");
            for (let i = 0; i < data.length; ++i) {
                console.log(data[i]);
                document.querySelector("#word").textContent = data[i].word;
                let speaker = data[i].phonetics.filter(e => e.text && e.audio)[0];
                if (speaker) {
                    document.querySelector("#phonetic").textContent = speaker.text;
                    document.querySelector("audio").src = speaker.audio;
                }
                let meanings = data[i].meanings;

                for (let j = 0; j < meanings.length; ++j) {
                    let sec = document.createElement("section");
                    sec.classList.add("meaning");
                    let type = document.createTextNode(meanings[j].partOfSpeech);
                    sec.appendChild(type);
                    let ol = document.createElement("ol");
                    for (let k = 0; k < meanings[j].definitions.length; k++) {
                        let li = document.createElement("li");
                        li.textContent = meanings[j].definitions[k].definition;
                        console.log(li.textContent);
                        if (meanings[j].definitions[k].example) {
                            let p = document.createElement("p");
                            p.textContent = "example: " + meanings[j].definitions[k].example;
                            console.log("example: " + p.textContent);
                            li.append(p);
                        }
                        // synonyms
                        if (meanings[j].definitions[k].synonyms.length > 0) {
                            let p = document.createElement("p");
                            p.textContent = "synonyms: " + meanings[j].definitions[k].synonyms;
                            console.log("synonyms: " + p.textContent);
                            li.append(p);
                        }
                        ol.appendChild(li);
                        sec.append(ol);
                    }

                    container.append(sec);
                }

            }
            // respdata = data;

        }
    }
    xhr.open("get", url);
    xhr.send();
}
var player = document.querySelector("#play");
player.onclick = function (ev) {
    console.log("play")
    ev.preventDefault();
    document.querySelector("audio").play();

}
queryWord("hello");
var search = document.querySelector("#search>div");
search.onclick = function (ev) {
    let word = document.querySelector("#search>input").value;
    let parent = document.querySelector(".right");
    let sec = document.querySelectorAll("section");
    for (let i = 0; i < sec.length; ++i) {
        parent.removeChild(sec[i]);
    }
    queryWord(word);
}
document.onkeydown = function (ev) {
    let inputWord = document.querySelector("#search>input");
    // console.log(inputWord);
    console.log(ev.keyCode + ": " + ev.key);
    if (ev.keyCode == 13 && document.activeElement == inputWord) {
        let word = inputWord.value;
        console.log("keydown");
        let parent = document.querySelector(".right");
        let sec = document.querySelectorAll("section");
        for (let i = 0; i < sec.length; ++i) {
            parent.removeChild(sec[i]);
        }
        queryWord(word);
    }
}