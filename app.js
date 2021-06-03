(() => {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createDucks() {
        return [...Array(5)].map(() => {
            return {
                x: random(0, window.innerHeight),
                y: window.innerHeight-150,
                speedX: random(-50,50),
                speedY: random(5, 10)
            };
        });
        // console.log(ducks);
    }

    function setupDuckElement(duck) {
        const duckElem = document.createElement(`div`);
        duckElem.className = 'duck';
        duckElem.style.left = `${duck.x}px`;
        duckElem.style.top = `${duck.y}px`;
        duckElem.style.backgroundImage = `url(./left-1.png)`;
        document.body.appendChild(duckElem);
        // console.log(duckElem);
        return {duck, duckElem};
    }

    //How to create the animation 
    function getDuckBackgroundImage(duck, duckElem) {
        const direction = duck.speedX > 0? 'right': 'left';
        return duckElem.style.backgroundImage.indexOf('1') !== -1 ? 
        `url(./${direction}-2.png)`:
        `url(./${direction}-1.png)`; 
    }

    function moveDuck(duckElem, duck) {
        const {left, top} = duckElem.getBoundingClientRect(); // Return positon on the screen
        const outOfBoundX = duck.x < 0 || duck.x > (window.innerWidth-160);
        const outOfBoundY = duck.y< 0 || duck.y > (window.innerHeight-150);
        // console.log(x);
        if (outOfBoundX) {
            duck.speedX *= -1;
        }

        if (outOfBoundY) {
            duck.speedY *= -1;
        }

        duck.x = left + duck.speedX;
        duck.y = top - duck.speedY;
        duckElem.style.left = `${duck.x}px`;
        duckElem.style.top = `${duck.y}px`;

        duckElem.style.backgroundImage = getDuckBackgroundImage(duck, duckElem);
    }

    function shootDuck(event) {
        // console.log(event)
        const duckElem = event.target;
        duckElem.style.transition = 'top 2s';
        duckElem.style.top = `${window.innerHeight-150}px`;
        // console.log(duckElem.interval);
        clearInterval(duckElem.interval); // Stop interval
        setTimeout(()=>{
            document.body.removeChild(duckElem);
            const duck = document.querySelector(`.duck`);

            if (!duck) {
                const winningElem = document.querySelector(`.winning`);
                winningElem.style.opacity = 1;
            }
        }, 2000); // หลัง2วินาทีค่อยทำ
    }

    function run() {
        const ducks = createDucks();
        const duckElems = ducks.map(setupDuckElement); // Map return array 

        duckElems.forEach(({ duck, duckElem }) => {
            duckElem.interval =  setInterval(() => moveDuck(duckElem, duck),100); // setInterval return the value that can use to stop this function
            duckElem.addEventListener('click',shootDuck); // Pass property event
        });

    }

    run();
})();