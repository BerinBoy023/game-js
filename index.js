// Canvas 
const canvas = document.querySelector('canvas');
const scoreEl = document.getElementById('scoreEl');
const startGameBtn = document.getElementById('startGameBtn');
const levelRadios = document.getElementsByTagName('input');
const modelEl = document.getElementById('modelEl');
const bigScore = document.getElementById('bigScore');
const levelEl = document.getElementById('levelEl');
const continueGameBtn = document.getElementById('continueGameBtn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
let animationId;
let score = 0;
const friction = 0.99;
let allowShoot = true;
let strongProjectile = false;
let levelOne = false;
let levelTwo = false;
let levelThree = false;
let levelFour = false;
let levelFive = false;
let levelSix = false;
let levelSeven = false;
let levelEight = false;
let levelNine = false;
let levelTen = false;
let spawnInterval;
let shootSpeed = 700;
let enemySpeed = 1000;
let shootSize = 5;
let projectileColor = 'white';
// Placement of the player
const x = canvas.width / 2;
const y = canvas.height / 2;

// Create player
let player = new Player( x, y, 10, 'white');
let projectiles = [];
let enemies = [];
let particles = [];

function init(is_level)
{
    player = new Player( x, y, 10, 'white');
    projectiles = [];
    enemies = [];
    particles = [];
    if( !is_level )
    {
        shootSpeed = 700;
        enemySpeed = 1000;
        shootSize = 5;
        score = 0;
        strongProjectile = false;
        projectileColor = 'white'

    }
    scoreEl.innerHTML = score;
    bigScore.innerHTML = score;
}

function spawnEnemies()
{
    if( spawnInterval )
     clearInterval(spawnInterval);
    spawnInterval = setInterval(()=>{
        const radius = Math.random() * (30 - 4) + 4;

        let x;
        let y;

        if(Math.random() < 0.5)
        {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        }
        else
        {
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
            x = Math.random() * canvas.width;
        }

        const color = `hsl(${Math.random()* 360} , 50%, 50%)`;
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x,y,radius,color,velocity))
    }, enemySpeed);
}

// Listen for clicks for projectile
addEventListener('click', (event) => {
    if( allowShoot )
    {
        const angle = Math.atan2(event.clientY - y, event.clientX - x);
        
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        
        // x and y is global variable so it is right in the middle
        projectiles.push(new Projectile(x,y,shootSize,projectileColor, velocity))
        allowShoot = false;
    }
    else
    {
        return;
    }
    setTimeout(() => {
        allowShoot = true;
    }, shootSpeed);
});

startGameBtn.addEventListener('click',()=>{
    init();
    animate();
    spawnEnemies();
    modelEl.style.display = 'none';
    levelEl.style.display = 'none';
});

continueGameBtn.addEventListener('click',()=>{
    init(true);
    enemySpeed -= 80;
    if( enemySpeed < 200 )
        enemySpeed = 200;
    for( var i=0; i< levelRadios.length; i++ )
    {
        if( levelRadios[i].type === 'radio' && levelRadios[i].checked )
        {
            switch( levelRadios[i].value )
            {
                case 'fastProjectile':
                    shootSpeed -= 200;
                    break;
                case 'bigProjectile':
                    shootSize += 2;
                    break;
                case 'strongProjectile':
                    strongProjectile = true;
                    projectileColor = 'red'
                    break;
            }
        }
    }

    spawnEnemies();
    animate();
    modelEl.style.display = 'none';
    levelEl.style.display = 'none';

});
