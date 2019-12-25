const loadJSON = (callback) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'db.json', true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
        try {
            if (xobj.readyState === 4 && xobj.status === 200) {
                // Required use of an anonymous callback 
                // as .open() will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        } catch (e) { }
    };
    xobj.send(null);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

window.onscroll = function(ev) {
    
    
};

var page = 1
catchAndLoadImage(0);
catchAndLoadImage(1);
if(window.outerHeight>window.outerWidth) {
    document.getElementById('post-column-1').style.width="100%";
    document.getElementById('post-column-2').style.display="none";
    document.getElementById('post-column-3').style.display="none";
}

function loadMore() {
    page++;
    catchAndLoadImage(page)
}


function catchAndLoadImage(page) {
    try {
        loadJSON((res) => {
            var data = JSON.parse(res).links
            shuffle(data)
            data=data.slice(page*12)
            data=[data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11]]
            //console.log(shuffle(data))
            if(outerHeight<window.outerWidth) {
                loadImageAllColumns(data)
            }
            else {
                loadImageOneColumns(data)
            }
        })
    } catch (error) { }
}

function loadImageAllColumns(data) {
    try {
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
    } catch(e) {}
}

function loadImageOneColumns(data) {
    try {
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
            loadImage(e.link, 1)
        })
        data3.forEach(e => {
            loadImage(e.link, 1)
        })
    } catch(e) {}
}

function loadImage(code, num) {
    while(code.length>14) {
        loadJSON((res) => {
            var data = JSON.parse(res).links
            shuffle(data)
            code=data[Math.floor(random()*1000+1)]
        })
    }
    const xhr = new XMLHttpRequest()
    try {
        xhr.open('GET', `https://www.instagram.com/p/${code}/`, true)
        xhr.onload = function () {
            if (this.status == 200) {
                let start = this.responseText.search('<script type="text/javascript">window._sharedData = ') + ('<script type="text/javascript">window._sharedData = ').length
                let end = this.responseText.search('false};') + 6
                var sharedData = this.responseText.slice(start, end)
                try { var obj = JSON.parse(sharedData).entry_data.PostPage[0].graphql.shortcode_media } catch (e) { }
                if (obj) {
                    var addInnerHtml = `
                    <div class="post">
                    <div class="post-owner"> 
                        <img class="avatar" src="${obj.owner.profile_pic_url}">  
                        <a href="https://instagram.com/${obj.owner.username}" style="padding-top:10px;padding-left:10px;">${obj.owner.username}</a>
                    </div>
                    <div class="space-box"></div>`
                    if(obj.edge_sidecar_to_children) {
                        addInnerHtml += 
                        `<div style="width: 100%; padding-right:4px;padding-left:4px;">
                            <div style="display: flex; overflow: hidden;"><div style="margin: auto;"><a href="https://instagram.com/p/${obj.shortcode}">
                            `
                        var z=200;
                        obj.edge_sidecar_to_children.edges.forEach(e => {
                            if(z==200) addInnerHtml += `<img style="max-width:200%; width: 100%; position: relative; display: absolute;transition: transform 0.5s ease-in; z-index=${z};border-radius: 8px;" src="${e.node.display_url}">`
                            //else addInnerHtml += `<img style="position: relative; display: none;transition: transform 0.5s ease-in; z-index=${z}" src="${e.node.display_url}">`
                            z--;
                        })
                        addInnerHtml+=    `
                            </a></div>
                            <div style="display: flex;"><button style="display: none;" onclick="back()">Back</button><button style="display: none;" onclick="next()">Next</button></div>
                        </div></div>`
                    } else addInnerHtml += `<div style="text-align:center; width: 100%; padding-right:4px;padding-left:4px;"><a href="https://instagram.com/p/${obj.shortcode}"><img style="border-radius: 8px; width: 100%; " src="${obj.display_url}"></a></div>`
                    addInnerHtml+=`<div style="display: flex;"><img class="like" src="./images/love.png"><div class="like-number">${obj.edge_media_preview_like.count}</div></div>`
                    if (obj.edge_media_to_caption.edges.length == 0) {
                        addInnerHtml+=`
                    <div class="space-box"></div>
                    <div class="space-box"></div>
                    </div>
                    `
                    }
                    else {
                        addInnerHtml+=`
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
    } catch (e) { 
    }
    xhr.send(null);
    if(xhr.status==404) {
        loadImage(code,num)
    }
}

function next() {
    console.log(document.getElementsByTagName('img').length)
}