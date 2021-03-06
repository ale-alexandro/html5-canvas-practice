/* doger, Alexander Lenec, 2013. All rights reserved */
function hypot(a, b) {
    var c = Math.sqrt(a * a + b * b);
    return c;
}

function len(P1, P2) {
    return hypot(P1.x - P2.x, P1.y - P2.y);
}

window.onload = function () {

    var togda, start, nameGm, score, skill, a, redraw, fps = 10;

    var hero = {
        x: 100,
        y: 150,
        r: 35,
        color: "yellow",
        draw: drawHero
    };
    var enemy = {
        x: 300,
        y: 600,
        r: 40,
        color: "red",
        targetX: hero.x,
        targetY: hero.y,
        speed: 0,
        draw: drawEnemy
    };

    function setFPS() {
        fps = prompt("Введите уровень FPS(Кадров в секунду)", "");
        fps = parseInt(fps);
    }

    function skillSet() {
        skill = document.getElementsByName("skill");
        if (skill[0].checked == true) {
            a = 0.2;
            enemy.speed = 100;
        }
        if (skill[1].checked == true) {
            a = 0.4;
            enemy.speed = 200;
        }
        if (skill[2].checked == true) {
            a = 0.6;
            enemy.speed = 300;
        }
        if (skill[3].checked == true) {
            a = 0.8;
            enemy.speed = 400;
        }
        if (skill[4].checked == true) {
            a = 1;
            enemy.speed = 500;
        }
    }

    function numToStr() {
        skill = document.getElementsByName("skill");
        if (skill[0].checked == true) {
            var skillStr = "Лёгкая";
        }
        if (skill[1].checked == true) {
            var skillStr = "Средняя";
        }
        if (skill[2].checked == true) {
            var skillStr = "Тяжёлая";
        }
        if (skill[3].checked == true) {
            var skillStr = "Нереальная";
        }
        if (skill[4].checked == true) {
            var skillStr = "Хардкорная";
        }
        return skillStr;
    }

    function genTblRow() {
        var tbl = document.getElementById("recTbl");

        var tblR = document.createElement('tr');
        recTbl.appendChild(tblR);

        var tblTN = document.createElement('th');
        tblTN.innerHTML = nameGm;
        tblR.appendChild(tblTN);

        var tblTSk = document.createElement('td');
        tblTSk.innerHTML = numToStr();
        tblR.appendChild(tblTSk);

        var tblTS = document.createElement('td');
        tblTS.innerHTML = score;
        tblR.appendChild(tblTS);
    }

    function drawHero() {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2.0, false);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "lightblue";
        ctx.beginPath();
        ctx.arc(this.x - 15, this.y - 10, this.r - 23, 0, Math.PI * 2.0, false);
        ctx.arc(this.x + 15, this.y - 10, this.r - 23, 0, Math.PI * 2.0, false);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x - 15, this.y - 10, this.r - 28, 0, Math.PI * 2.0, false);
        ctx.arc(this.x + 15, this.y - 10, this.r - 28, 0, Math.PI * 2.0, false);
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.x - 22, this.y - 26);
        ctx.lineTo(this.x - 5, this.y - 26);
        ctx.moveTo(this.x + 5, this.y - 26);
        ctx.lineTo(this.x + 22, this.y - 26)
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y + 9, this.r - 15, 0, Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }

    function drawEnemy() {
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2.0, false);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x - 18, this.y - 10, this.r - 23, 0, Math.PI * 2.0, false);
        ctx.arc(this.x + 18, this.y - 10, this.r - 23, 0, Math.PI * 2.0, false);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x - 18, this.y - 10, this.r - 28, 0, Math.PI * 2.0, false);
        ctx.arc(this.x + 18, this.y - 10, this.r - 28, 0, Math.PI * 2.0, false);
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.x - 22, this.y - 30);
        ctx.lineTo(this.x + 22, this.y - 30);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y + 30, this.r - 20, 0, Math.PI, true);
        ctx.fill();
        ctx.closePath();

    }

    function moveHero(mouseEvent) {
        var rect = canva.getBoundingClientRect();
        hero.x = mouseEvent.clientX - rect.left;
        hero.y = mouseEvent.clientY - rect.top;
    }

    function moveEnemy(time) {
        var dx = enemy.targetX - enemy.x;
        var dy = enemy.targetY - enemy.y;
        var dist = hypot(dx, dy);
        var s = enemy.speed * time;
        if (dist <= s) {
            enemy.x = enemy.targetX;
            enemy.y = enemy.targetY;
        }
        else {
            enemy.x = enemy.x + s * dx / dist;
            enemy.y = enemy.y + s * dy / dist;
            enemy.targetX = hero.x;
            enemy.targetY = hero.y;
        }
    }

    function checkLose() {
        if (len(hero, enemy) < hero.r + enemy.r) {
            ctx.fillStyle = "black";
            ctx.fillText("You lose ((((((((( ", 100, 100);
            clearInterval(redraw);
            genTblRow();
            /*a = 0;
            enemy.speed = 0;*/
        }
    }

    function render() {
        ctx.clearRect(0, 0, canva.width, canva.height);
        hero.draw();
        enemy.draw();
        ctx.fillStyle = "black";
        score = (Date.now() - start) / 1000;
        ctx.fillText("Score: " + score, 10, 10);
    }

    function game() {
        var sejchas = Date.now();
        moveEnemy((sejchas - togda) / 1000);
        render();
        checkLose();
        enemy.speed += a;
        togda = sejchas;
    }

    var canva = document.getElementById("cnv");
    var b1 = document.getElementById("but1");
    canva.width = 800;
    canva.height = 600;
    var skl = document.getElementById("skill");
    var ctx = canva.getContext("2d");

    b1.onclick = function () {
        nameGm = prompt("Введите ваше имя.", "");
        togda = Date.now();
        start = Date.now();
        hero.x = 100;
        hero.y = 150;
        enemy.x = 300;
        enemy.y = 350
        score = 0;
        canva.addEventListener("mousemove", moveHero, false);
        skillSet();
        redraw = setInterval(game, 10);
    }


};