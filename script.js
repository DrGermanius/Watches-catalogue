var client = new XMLHttpRequest();
client.onload = queryHandler;
client.open("GET", "data.xml");
client.send();

function queryHandler() {
    if (this.status === 200 && this.readyState === 4) {
        var parser = new DOMParser();
        var data = parser.parseFromString(this.responseText, "application/xml");
        buildCatalogue(data.getElementsByTagName("watch"));
        buildFooter(data.getElementsByTagName("person"));
    }
}

function buildCatalogue(watches) {
    var container = document.querySelector("article");
    var name;
    var item;
    var overflow;
    var image;
    var itemName;
    var description;
    var close;
    for (var j = 0; j < watches.length; j++) {
        name = watches[j].getElementsByTagName("name")[0].childNodes[0].nodeValue;

        item = document.createElement("div");
        item.classList.add("item");
        item.onclick = function () {
            if (window.innerHeight < 400 || window.innerWidth < 400) return;
            this.classList.add("active");
        };

        overflow = document.createElement("div");
        overflow.classList.add("overflow");

        image = document.createElement("img");
        image.src = "img/" + name + ".jpg";
        image.alt = name;
        overflow.appendChild(image);

        itemName = document.createElement("h2");
        itemName.innerHTML = name;
        overflow.appendChild(itemName);

        description = document.createElement("p");
        description.innerHTML = watches[j].getElementsByTagName("description")[0].childNodes[0].nodeValue;
        overflow.appendChild(description);

        close = document.createElement("div");
        close.classList.add("close");
        close.onclick = function (event) {
            this.parentNode.parentNode.classList.remove("active");
            event.stopPropagation();
        };
        overflow.appendChild(close);


        item.appendChild(overflow);
        container.appendChild(item);
    }
}

function buildFooter(creator) {
    var creatorName = creator[0].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    buildParagraph(creatorName);
    var creatorCode = creator[0].getElementsByTagName("edu")[0].childNodes[0].nodeValue;
    buildParagraph(creatorCode);
}

function buildParagraph(data) {
    var footer = document.querySelector("footer");
    var p = document.createElement("p");
    p.innerHTML = data;
    footer.appendChild(p);
}