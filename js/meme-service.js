'use script'
const SAVED_MEME = 'Saved meme'
var gSavedMemes = [];
var id = 0;
var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

var gImgs = [{
    id: 1,
    url: './imgs/1.jpg',
    keywords: ['happy', 'trump']
}, {
    id: 2,
    url: './imgs/2.jpg',
    keywords: ['happy']

}, {
    id: 3,
    url: './imgs/3.jpg',
    keywords: ['happy']

}, {
    id: 4,
    url: './imgs/4.jpg',
    keywords: ['happy']

}, {
    id: 5,
    url: './imgs/5.jpg',
    keywords: ['happy']

}, {
    id: 6,
    url: './imgs/6.jpg',
    keywords: ['happy']

}, {
    id: 7,
    url: './imgs/7.jpg',
    keywords: ['happy']

}, {
    id: 8,
    url: './imgs/8.jpg',
    keywords: ['happy']

}, {
    id: 9,
    url: './imgs/9.jpg',
    keywords: ['happy']

}, {
    id: 10,
    url: './imgs/10.jpg',
    keywords: ['happy']

}, {
    id: 11,
    url: './imgs/11.jpg',
    keywords: ['happy']

}, {
    id: 12,
    url: './imgs/12.jpg',
    keywords: ['happy']

}, {
    id: 13,
    url: './imgs/13.jpg',
    keywords: ['happy']

}, {
    id: 14,
    url: './imgs/14.jpg',
    keywords: ['happy']

}, {
    id: 15,
    url: './imgs/15.jpg',
    keywords: ['happy']

}, {
    id: 16,
    url: './imgs/16.jpg',
    keywords: ['happy']

}, {
    id: 17,
    url: './imgs/17.jpg',
    keywords: ['happy']

}, {
    id: 18,
    url: './imgs/18.jpg',
    keywords: ['happy']

}];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        id: id++,
        txt: 'Write your text!',
        size: 40,
        align: 'center',
        color: 'white',
        x: 250,
        y: 70,
    }]
}


function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function moveTxt(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff
}



function inputTxt() {
    var memeTxt = document.querySelector('.meme-text');
    gMeme.lines[gMeme.selectedLineIdx].txt = memeTxt.value;



}

function changeSize(diff) {
    console.log(gMeme.lines[gMeme.selectedLineIdx].size);

    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function addLine() {
    if (gMeme.lines.length === 0) {
        gMeme.lines.push({
            txt: 'Write your text!',
            size: 40,
            align: 'center',
            color: 'white`',
            x: 250,
            y: 70,
        })
    } else if (gMeme.lines.length === 1) {
        gMeme.lines.push({
            txt: 'Write your text!',
            size: 40,
            align: 'center',
            color: 'white`',
            x: 250,
            y: 400,
        })
    } else {
        gMeme.lines.push({
            txt: 'Write your text!',
            size: 40,
            align: 'center',
            color: 'white`',
            x: 250,
            y: 250,
        })
    }
    var memeTxt = document.querySelector('.meme-text');
    memeTxt.value = '';
    memeTxt.focus();
}

function switchLine() {
    var memeTxt = document.querySelector('.meme-text');
    memeTxt.value = '';
    memeTxt.focus();

    var coordinates = {
        offsetX: gMeme.lines[gMeme.selectedLineIdx].x,
        offsetY: gMeme.lines[gMeme.selectedLineIdx].y
    }
    console.log(gMeme.selectedLineIdx);
    console.log(gMeme.lines[gMeme.selectedLineIdx].x);
    console.log(gMeme.lines[gMeme.selectedLineIdx].y);

    if (gMeme.selectedLineIdx === 0 && gMeme.lines.length !== 1) {
        gMeme.selectedLineIdx++
            console.log('0');
        return coordinates;
    }

    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
        console.log('max');
        return coordinates
    }
    if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx++
            console.log('+0+');
        return coordinates;
    }

}

function saveMeme(memeToDataUrl) {
    var a = loadFromStorage(SAVED_MEME)
    if (a) {
        gSavedMemes = a
    }
    console.log(a);

    gSavedMemes.push(memeToDataUrl)
    saveToStorage(SAVED_MEME, gSavedMemes)
}


function removeTxt() {

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--

        if (gMeme.selectedLineIdx < 0)
            gMeme.selectedLineIdx = 0
    console.log(gMeme.selectedLineIdx)
}

function changeAlign(pos) {

    gMeme.lines[gMeme.selectedLineIdx].align = pos
}