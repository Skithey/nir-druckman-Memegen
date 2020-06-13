'use script'

var isOpen = false
var gElCanvas;
var gCtx;
var gMeme = getMeme();
var gImgIdx;
var getImgs = getImgs()
var gMemeToDataUrl;
var gUploadedImgUrl;


function init() {
    RenderCards()
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gCtx.fillStyle = 'lightgrey';
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}


function toggleMenu() {
    isOpen = !isOpen
    var elSlider = document.querySelector('.slider')
    elSlider.classList.toggle('menu-open');
    //     var elHam = document.querySelector('.hamburger');
    //     if (isOpen) {
    //         elHam.innerText = 'x'
    //     } else {
    //         elHam.innerText = '☰'
    //     }
}

function RenderCards() {;
    var strHTMLs = gImgs.map(img => {
        return `<img onclick="onChoosePic(this)"  class="card" id="${img.id}"  src="${img.url}" alt="">
        </img>`
    })
    document.querySelector('.card-container').innerHTML = strHTMLs.join('');
}


function drawImgFromlocal() {
    var img = new Image()
    img.src = `./imgs/${gImgIdx}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, (gElCanvas.height + 10), (gElCanvas.width));
        // drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y);
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawText(gMeme.lines[i].txt, gMeme.lines[i].x, gMeme.lines[i].y, i)
        }
    }
}



function drawText(text, x, y, idx) {
    gCtx.font = gMeme.lines[idx].size + 'px san serif';
    gCtx.strokeStyle = gMeme.lines[idx].borderColor
    gCtx.fillStyle = gMeme.lines[idx].color;
    gCtx.textAlign = gMeme.lines[idx].align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onInputTxt() {
    inputTxt()
    drawImgFromlocal();
}

function onChoosePic(img) {
    var elModal = document.querySelector('.modal')
    var elInfo = document.querySelector('.info-section')
    var elCardsContainer = document.querySelector('.main-cards-container')
    var elSearchContainer = document.querySelector('.search-container')
    elModal.hidden = false;
    elInfo.hidden = true;
    elCardsContainer.hidden = true;
    elSearchContainer.hidden = true;
    gImgIdx = img.id;
    drawImgFromlocal();
}

function onChangeSize(diff) {
    changeSize(diff)
    drawImgFromlocal();
}

function onMoveTxt(diff) {
    moveTxt(diff)
    drawImgFromlocal();
}

function onAddLine() {
    addLine()
    gMeme.selectedLineIdx++
        var elInput = document.querySelector('.meme-text');
    elInput.value = '';
    elInput.focus();

    drawImgFromlocal();
}

function onSwitchLine() {
    switchLine()
}


function onSaveMeme() {
    var elSavedMeme = document.querySelector('#my-canvas');
    gMemeToDataUrl = elSavedMeme.toDataURL("meme.png");

    var elInfo = document.querySelector('.info-section')
    var elCardsContainer = document.querySelector('.main-cards-container')
    var elSearchContainer = document.querySelector('.search-container')
    var elModal = document.querySelector('.modal');
    elInfo.hidden = false;
    elCardsContainer.hidden = false;
    elSearchContainer.hidden = false;
    elModal.hidden = true;
    saveMeme(gMemeToDataUrl)


    var firstLine = gMeme.lines.filter(line => {
        return line.id === 0
    });
    gMeme.lines = firstLine

    gMeme.lines[0].txt = 'Write your text here'

    var elInput = document.querySelector('.meme-text')
    elInput.value = ''
    gMeme.selectedLineIdx = 0;
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function onOpenMemes() {
    var elMemeSection = document.querySelector('.saved-memes-section')
    var loadedImgs = loadFromStorage(SAVED_MEME)
    if (!loadedImgs || !loadedImgs.length) {

        elMemeSection.innerText = 'You don\'t have saved memes'
    } else {
        var imgsHTMLs = loadedImgs.map(loadedImg => {
            return `<img class="loaded-meme" src="${loadedImg}"></img>`
        });
        var elMemeImgs = document.querySelector('.saved-memes-imgs');
        elMemeImgs.innerHTML = imgsHTMLs.join('');
    }


    var elBody = document.querySelector('body')
    var elInfo = document.querySelector('.info-section')
    var elCardsContainer = document.querySelector('.main-cards-container')
    var elSearchContainer = document.querySelector('.search-container')
    var elModal = document.querySelector('.modal');
    var elSavedMemes = document.querySelector('.saved-memes');

    elBody.style.backgroundColor = '#e3e3e3'
    elInfo.hidden = true;
    elCardsContainer.hidden = true;
    elSearchContainer.hidden = true;
    elModal.hidden = true;
    elSavedMemes.hidden = false;
}


function onSearchKeyword() {
    var imgsArray = [];
    var elInput = document.querySelector('.search-input');
    var searchKeyword = elInput.value
    if (searchKeyword === '') {
        console.log('banana');
        RenderCards()
    } else {
        for (let i = 0; i < gImgs.length; i++) {
            for (let j = 0; j < gImgs[i].keywords.length; j++) {
                if (searchKeyword === gImgs[i].keywords[j]) {
                    imgsArray.push(gImgs[i])
                }
            }
        }

        var strHTMLs = imgsArray.map(img => {
            return `<img class="card" id="${img.id}" onclick="onEditView(); onFindPic(this)" src="${img.url}"></img>`
        })
        var elCardsContainer = document.querySelector('.card-container');
        elCardsContainer.innerHTML = strHTMLs.join('');
    }
}

function imgToUrl() {
    var elSavedMeme = document.querySelector('#my-canvas');
    gMemeToDataUrl = elSavedMeme.toDataURL('meme.png')
}

function onOpenShareModal() {
    imgToUrl()
    elShareModal = document.querySelector('.share-modal')
    elShareModal.style.display = 'block'
    elShareSpace = document.querySelector('.share-container')
    elShareSpace.innerHTML = `  <button type="submit" href="https://www.facebook.com/sharer/sharer.php?u=${gUploadedImgUrl}&t=${gUploadedImgUrl}" title="Share on Facebook" class="share-btn-modal btn-modal" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${gUploadedImgUrl}&t=${gUploadedImgUrl}'); return false;">share</button>`
}

function downloadImg(elLink) {
    imgToUrl()
    elLink.href = gMemeToDataUrl;

}





function onUploadImg(elForm, ev) {
    ev.preventDefault()

    imgToUrl()
    var elShareContainer = document.querySelector('.share-container');
    elShareContainer.style.display = 'block'
        // console.log(gMemeToDataUrl)


    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        var elShareArea = document.querySelector('.share-area')
        elShareArea.innerHTML = `
        <button class="share-fb special-btns share-link" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}"   title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share 
        </button>`
    }
    doUploadImg(elForm, onSuccess);
}


function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(function(res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function(err) {
            console.error(err)
        })
        // document.body.classList.toggle('menu-open');
    var elScreen = document.querySelector('.screen')
    elScreen.style.visibility = 'visible'
    elScreen.style.opacity = '1'

}

function OnCloseShare() {
    var elShareContainer = document.querySelector('.share-container');
    elShareContainer.style.display = 'none'
        // document.body.classList.toggle('menu-open');
    var elScreen = document.querySelector('.screen')
    elScreen.style.visibility = 'hidden'
    elScreen.style.opacity = '0'
}

function onRemoveTxt() {
    removeTxt()
    drawImgFromlocal()
}

function onChangeAlign(pos) {
    changeAlign(pos)
    drawImgFromlocal()

}

function onChangeStroke() {
    changeStroke()
    drawImgFromlocal()
}

function onChangeTxtColor() {
    changeTxtColor()
    drawImgFromlocal()
}