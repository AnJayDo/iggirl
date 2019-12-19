function catchAndLoadImage() {
    try {
        var data1 = ["B6QM7ucBtIf", "B0A-uuUH7YV", "B5sqAJrB0VX"]
        var data2 = ["B3osMrrhFje", "Bw3luZYg9eH", "B6NoDgsBf0_"]
        var data3 = ["B5ks73klOWn", "BulgMJ0giZJ", "B6AwYCuB4Kw"]
        data1.forEach(e => {
            loadImage(e, 1)
        })
        data2.forEach(e => {
            loadImage(e, 2)
        })
        data3.forEach(e => {
            loadImage(e, 3)
        })
    } catch (error) { }
}
function loadImage(code, num) {
    var xhr = new XMLHttpRequest();
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
                <img src="${obj.display_url}">
                </div>
                `
                }
                else {
                    var addInnerHtml = `
                <div class="post">
                <img src="${obj.display_url}">
                <div>${obj.edge_media_to_caption.edges[0].node.text}</div>
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