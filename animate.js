function animate()
{
    animationId = requestAnimationFrame(animate);
    // Clear background
    context.fillStyle = 'rgba(0,0,0, 0.1)';
    context.fillRect(0,0, x * 2,y * 2);
    player.draw();
    particles.forEach((particle, index) =>
    {
        if( particle.alpha <= 0 )
        {
            particles.splice(index, 1);
        } 
        else
        {
            particle.update();
        }
    });

    projectiles.forEach((projectile,projIndex) => {
        projectile.update();

        // Remove projectile from edge of screen
        if(projectiles.x + projectile.radius < 0 || projectiles.x - projectile.radius > canvas.width
            || projectiles.y - projectile.radius < 0 || projectiles.y - projectile.radius > canvas.height)
        {
            setTimeout(() => {
                projectiles.splice(projIndex, 1);
            }, 0);
        }
    });

    // Loop over enemies
    enemies.forEach((enemy, index) => 
    {
        enemy.update();

        // Distance between player and enemy
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        // Enemy and player collided 
        if( dist - enemy.radius - player.radius < 1) 
        {
            // End game
            setTimeout(() => {
                cancelAnimationFrame(animationId);
                levelOne = false;
                levelTwo = false;
                levelThree = false;
                levelFour = false;
                levelFive = false;
                levelSix = false;
                levelSeven = false;
                levelEight = false;
                levelNine = false;
                levelTen = false;
                modelEl.style.display = 'flex';
                bigScore.innerHTML = score;
            }, 0);
        }

        // Loop over projectiles
        projectiles.forEach((projectile, projIndex) => {
           const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

           // projectile and enemy collided 
           if( dist - enemy.radius - projectile.radius < 1) 
           {
               // Create explosions
               for( let i = 0; i < enemy.radius * 2; i++)
               {
                   particles.push(new Particle(projectile.x,projectile.y, Math.random() * 2, enemy.color, 
                   {x: (Math.random() - 0.5) * (Math.random() * 6), 
                    y: (Math.random() - 0.5) * (Math.random() * 6)}))
               }
               // Reduce size of enemy if big
               if( !strongProjectile && enemy.radius - 10 > 5 )
               {
                    // Increase score
                    score += 100;
                    scoreEl.innerHTML = score;
                    scoreEl.innerHTML = score;
                   gsap.to(enemy, {
                       radius: enemy.radius - 10
                   })
                    setTimeout(() => {
                        projectiles.splice(projIndex, 1);
                    }, 0);
               }
               else // Remove enemy if small
               {
                    // Increase score
                    score += 250;
                    scoreEl.innerHTML = score;
                   setTimeout(() => {
                       enemies.splice(index, 1);
                       projectiles.splice(projIndex, 1);
                   }, 0);
               }
               if( score >= 1000 && !levelOne 
                || score >= 2000 && !levelTwo 
                || score >= 3000 && !levelThree
                || score >= 4000 && !levelFour
                || score >= 5000 && !levelFive
                || score >= 6000 && !levelSix
                || score >= 7000 && !levelSeven 
                || score >= 8000 && !levelEight
                || score >= 9000 && !levelNine
                || score >= 10000 && !levelTen
                )
               {
                   cancelAnimationFrame(animationId);
                   levelEl.style.display = 'flex';
                   if( !levelOne )
                   {
                        levelOne = true;
                   }
                   else if( !levelTwo )
                   {
                        levelTwo = true;
                   }
                   else if( !levelThree )
                   {
                        levelThree = true;
                   }
                   else if( !levelFour )
                   {
                        levelFour = true;
                   }
                   else if( !levelFive )
                   {
                        levelFive = true;
                   }
                   else if( !levelSix )
                   {
                        levelSix = true;
                   }
                   else if( !levelSeven )
                   {
                        levelSeven = true;
                   }
                   else if( !levelEight )
                   {
                        levelEight = true;
                   }
                   else if( !levelNine )
                   {
                        levelNine = true;
                   }
                   else if( !levelTen )
                   {
                        levelTen = true;
                   }
               }
           }
        });
    });
}