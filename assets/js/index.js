let keydownFlag = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false,
}; // flag that action key is down
let handleInterval = {
    "ArrowUp": null,
    "ArrowDown": null,
    "ArrowLeft": null,
    "ArrowRight": null,
};
let betweenTime = 10; // ms

document.addEventListener('keydown', (event) => {
    if (keydownFlag[event.code]) return;
    keydownFlag[event.code] = true;
    handleInterval[event.code] = setInterval(() => {
        actionFuc(event);
    }, betweenTime);
})

document.addEventListener('keyup', (event) => {
    clearInterval(handleInterval[event.code]);
    keydownFlag[event.code] = false;

    setTimeout(() => {
        drone_box.style.transform = `rotate(0deg)`
    }, 5);
})


let actionFuc = (event) => {
    console.log(event.code);
    let step = 5;
    let elementWidth = drone_box.offsetWidth;
    let elementHeight = drone_box.offsetHeight;
    let top = point.getBoundingClientRect().top;
    let left = point.getBoundingClientRect().left;
    let maxLeft = window.innerWidth;
    let maxTop = window.innerHeight;
    let deg = 0;
    let arrowFlag = 0;

    let limitCondition = (left, top) => {
        if (maxLeft >= left && maxTop >= top && left >= 0 && top >= 0) {
            return true;
        }
        return false;
    }
    console.log(limitCondition(left, top))

    if (event.code == "ArrowUp") {
        top = top - step;
        left = left;
        deg = 0;
        arrowFlag = 1;
    }
    if (event.code == "ArrowRight") {
        top = top;
        left = left + step;
        deg = 20 + 'deg'
        arrowFlag = 1;
    }
    if (event.code == "ArrowDown") {
        top = top + step;
        left = left;
        deg = 0;
        arrowFlag = 1;
    }
    if (event.code == "ArrowLeft") {
        top = top;
        left = left - step;
        deg = -20 + 'deg';
        arrowFlag = 1;
    }

    if (limitCondition(left, top) == true && arrowFlag == 1) {
        drone_box.style.top = top - elementHeight / 2 + 'px';
        drone_box.style.left = left - elementWidth / 2 + 'px';
        drone_box.style.transform = `rotate(${deg})`;
        deg = arrowFlag = 0;
    }
}
