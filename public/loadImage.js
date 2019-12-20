const loadJSON = (callback) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'db.json', true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function catchAndLoadImage() {
    try {
        loadJSON((res) => {
            var data = JSON.parse(res).links
            while(data.length>0){
                const data1 = [data[0], data[1], data[2], data[3]]
                data = data.slice(4)
                const data2 = [data[0], data[1], data[2], data[3]]
                data = data.slice(4)
                const data3 = [data[0], data[1], data[2], data[3]]
                data = data.slice(4)
                data1.forEach(e => {
                    loadImage(e.link, 1)
                })
                data2.forEach(e => {
                    loadImage(e.link, 2)
                })
                data3.forEach(e => {
                    loadImage(e.link, 3)
                })
            }
        })

        // var data1 = ["B6QM7ucBtIf", "B0A-uuUH7YV", "B5sqAJrB0VX"]
        // var data2 = ["B3osMrrhFje", "Bw3luZYg9eH", "B6NoDgsBf0_"]
        // var data3 = ["B5ks73klOWn", "BulgMJ0giZJ", "B6AwYCuB4Kw"]

    } catch (error) { }
}
function loadImage(code, num) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `https://www.instagram.com/p/${code}/`, true)
    try {
        xhr.onload = function () {
            if (this.status == 200) {
                let start = this.responseText.search('<script type="text/javascript">window._sharedData = ') + ('<script type="text/javascript">window._sharedData = ').length
                let end = this.responseText.search('false};') + 6
                var sharedData = this.responseText.slice(start, end)
                try { var obj = JSON.parse(sharedData).entry_data.PostPage[0].graphql.shortcode_media } catch (e) { }
                if (obj) {
                    if (obj.edge_media_to_caption.edges.length == 0) {
                        var addInnerHtml = `
                    <div class="post">
                    <div style="display: flex; padding-top:5px;"> 
                    <img style="margin-top: 4px; margin-left: 14px; width: 30px; height: 30px; border-radius: 30px;" src="${obj.owner.profile_pic_url}">  
                        <a href="https://instagram.com/${obj.owner.username}" style="padding-top:10px;padding-left:10px;">${obj.owner.username}</a>
                    </div>
                    <div class="space-box"></div>
                    <img src="${obj.display_url}">
                    <div class="space-box"></div>
                    <div class="space-box"></div>
                    </div>
                    `
                    }
                    else {
                        var addInnerHtml = `
                    <div class="post">
                    <div class="post-owner"> 
                        <img style="margin-top: 4px; margin-left: 14px; width: 30px; height: 30px; border-radius: 50px;" src="${obj.owner.profile_pic_url}">  
                        <a href="https://instagram.com/${obj.owner.username}" style="padding-top:10px;padding-left:10px;">${obj.owner.username}</a>
                    </div>
                    <div class="space-box"></div>
                    <img style="width: 100%; padding-right:4px;padding-left:4px;" src="${obj.display_url}">
                    <div class="space-box"></div>
                    <div class="post-caption">${obj.edge_media_to_caption.edges[0].node.text}</div>
                    <div class="space-box"></div>
                    </div>
                    `
                    }
                    document.getElementById(`post-column-${num}`).innerHTML += addInnerHtml
                }
            }
        }
    } catch (e) { }
    xhr.send();
}
catchAndLoadImage();