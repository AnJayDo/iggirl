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

var page = 0
catchAndLoadImage(0);
function loadMore() {
    page++;
    catchAndLoadImage(page)
}


function catchAndLoadImage(page) {
    try {
        loadJSON((res) => {
            var data = JSON.parse(res).links
            data=data.slice(page*12)
            data=[data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11]]
            
            console.log(data)
            //console.log(shuffle(data))
                loadImageAllColumns(data)
            data=data.slice(12)
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

function loadImage(code, num) {
    if(code.length>14) return
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
                    if (obj.edge_media_to_caption.edges.length == 0) {
                        var addInnerHtml = `
                    <div class="post">
                    <div style="display: flex; padding-top:5px;"> 
                    <img style="margin-top: 4px; margin-left: 14px; width: 30px; height: 30px; border-radius: 30px;" src="${obj.owner.profile_pic_url}">  
                        <a href="https://instagram.com/${obj.owner.username}" style="padding-top:10px;padding-left:10px;">${obj.owner.username}</a>
                    </div>
                    <div class="space-box"></div>
                    <a href="https://instagram.com/p/${obj.shortcode}"><img style="border-radius: 8px;" src="${obj.display_url}"></a>
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
                    <a href="https://instagram.com/p/${obj.shortcode}"><img style="width: 100%; padding-right:4px;padding-left:4px;border-radius: 8px;" src="${obj.display_url}"></a>
                    <div class="space-box"></div>
                    <div class="post-caption">${obj.edge_media_to_caption.edges[0].node.text}</div>
                    <div class="space-box"></div>
                    </div>
                    `
                    }
                    document.getElementById(`post-column-${num}`).innerHTML += addInnerHtml
                }
            } else {
                
            }
        }
    } catch (e) { }
    xhr.send(null);
}