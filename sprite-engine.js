// Bug: Piskel 28×16 → CSS 42×24 (1.5×)
const BW = 42, BH = 24;
// Anteater: spritesheet frame 36×24 → CSS 72×48 (2×)
const AW = 72, AH = 48;

const bugs = [];
let anteater = null;
let mode     = null;
let animTick = 0;
let bugFrame = 0;

const bugBtn     = document.getElementById('bug-btn');
const clearBtn   = document.getElementById('clear-btn');
const cursorWrap = document.getElementById('cursor-wrap');
const cursorItem = document.getElementById('cursor-item');
const cursorHand = document.getElementById('cursor-hand');

document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('mousemove', e => {
    cursorWrap.style.left = e.clientX + 'px';
    cursorWrap.style.top  = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    if (mode) cursorHand.style.backgroundPosition = '0 0';
});
document.addEventListener('mouseup', () => {
    cursorHand.style.backgroundPosition = '-58px 0';
});

bugBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (mode === 'bugs') {
        mode = null;
        bugBtn.classList.remove('active');
        clearBtn.classList.remove('visible');
        clearBtn.classList.remove('active');
        document.body.classList.remove('placing');
    } else {
        mode = 'bugs';
        bugBtn.classList.add('active');
        clearBtn.classList.remove('active');
        clearBtn.classList.add('visible');
        document.body.classList.add('placing');
    }
    syncCursorItem();
});

clearBtn.addEventListener('click', e => {
    e.stopPropagation();
    mode = anteater ? 'empty' : 'anteater';
    bugBtn.classList.remove('active');
    clearBtn.classList.add('active');
    document.body.classList.add('placing');
    syncCursorItem();
});

document.addEventListener('click', e => {
    if (mode === 'bugs') {
        spawnBug(e.clientX, e.clientY);
    } else if (mode === 'anteater') {
        placeAnteater(e.clientX, e.clientY);
        mode = 'empty';
        syncCursorItem();
    }
});

function buildBugSprite() {
    const div = document.createElement('div');
    div.className = 'bug-sprite';
    return div;
}

function buildAnteaterSprite() {
    const div = document.createElement('div');
    div.className = 'anteater-sprite';
    return div;
}

function syncCursorItem() {
    cursorItem.innerHTML = '';
    if (mode === 'bugs') {
        cursorItem.appendChild(buildBugSprite());
        cursorItem.className = '';
        cursorItem.style.display = 'block';
        cursorItem.style.left = (8 - BW / 2) + 'px';
        cursorItem.style.top  = (36 - BH / 2) + 'px';
    } else if (mode === 'anteater') {
        const sprite = buildAnteaterSprite();
        sprite.style.transform = 'scaleX(-1)';
        cursorItem.appendChild(sprite);
        cursorItem.className = '';
        cursorItem.style.display = 'block';
        cursorItem.style.left = (8 - AW / 2) + 'px';
        cursorItem.style.top  = (36 - AH / 2) + 'px';
    } else {
        cursorItem.style.display = 'none';
    }
}

function snap90(angle) {
    return Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
}

// Bug faces LEFT in sprite. Right = mirror; other dirs = rotate.
function bugTransform(angle) {
    const a = snap90(angle);
    if (Math.cos(a) > 0.5) return 'scaleX(-1)';
    return `rotate(${a + Math.PI}rad)`;
}

// Anteater faces RIGHT in sprite. Mirror when moving left.
function anteaterTransform(angle) {
    return Math.cos(angle) < 0 ? 'scaleX(-1)' : '';
}

function spawnBug(cx, cy) {
    const x = Math.round(cx - BW / 2);
    const y = Math.round(cy - BH / 2);
    const el = document.createElement('span');
    el.className = 'bug';
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    const sprite = buildBugSprite();
    el.appendChild(sprite);
    document.body.appendChild(el);
    bugs.push({
        el, sprite, x, y,
        angle: Math.random() * Math.PI * 2,
        speed: 2,
        state: 'walking',
        timer: 15 + Math.floor(Math.random() * 20),
    });
}

function placeAnteater(cx, cy) {
    const x = Math.round(cx - AW / 2);
    const y = Math.round(cy - AH / 2);
    const el = document.createElement('span');
    el.className = 'anteater';
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    const sprite = buildAnteaterSprite();
    el.appendChild(sprite);
    document.body.appendChild(el);
    anteater = { el, sprite, x, y, wanderAngle: Math.random() * Math.PI * 2 };
}

setInterval(tick, 100);

function tick() {
    animTick ^= 1;
    bugFrame = (bugFrame + 1) % 4;
    const W = window.innerWidth, H = window.innerHeight;

    for (const bug of bugs) {
        if (bug.state === 'walking') {
            bug.angle += (Math.random() - 0.5) * 0.15;
            let nx = bug.x + Math.round(Math.cos(bug.angle) * bug.speed);
            let ny = bug.y + Math.round(Math.sin(bug.angle) * bug.speed);
            if (nx < 0)         { nx = 0;      bug.angle = Math.PI - bug.angle; }
            else if (nx > W-BW) { nx = W-BW;   bug.angle = Math.PI - bug.angle; }
            if (ny < 0)         { ny = 0;       bug.angle = -bug.angle; }
            else if (ny > H-BH) { ny = H-BH;   bug.angle = -bug.angle; }
            bug.x = nx; bug.y = ny;
            bug.timer--;
            if (bug.timer <= 0) { bug.state = 'stopped'; bug.timer = 8 + Math.floor(Math.random() * 15); }
        } else {
            bug.timer--;
            if (bug.timer <= 0) {
                bug.state  = 'walking';
                bug.timer  = 15 + Math.floor(Math.random() * 20);
                bug.angle += (Math.random() - 0.5) * Math.PI * 1.2;
            }
        }
        bug.el.style.left      = bug.x + 'px';
        bug.el.style.top       = bug.y + 'px';
        bug.el.style.transform = bugTransform(bug.angle);
        // frame pitch: 45px per frame at 1.5× scale
        bug.sprite.style.backgroundPositionX =
            -((bug.state === 'walking' ? bugFrame : 0) * 45) + 'px';
    }

    if (anteater) {
        let nearBug = null, nearDist = Infinity;
        for (const b of bugs) {
            const dx = (b.x + BW/2) - (anteater.x + AW/2);
            const dy = (b.y + BH/2) - (anteater.y + AH/2);
            const d  = Math.sqrt(dx*dx + dy*dy);
            if (d < nearDist) { nearDist = d; nearBug = b; }
        }
        if (nearBug) {
            const dx = (nearBug.x + BW/2) - (anteater.x + AW/2);
            const dy = (nearBug.y + BH/2) - (anteater.y + AH/2);
            anteater.wanderAngle = Math.atan2(dy, dx);
            if (nearDist < 30) { nearBug.el.remove(); bugs.splice(bugs.indexOf(nearBug), 1); }
        } else {
            anteater.wanderAngle += (Math.random() - 0.5) * 0.2;
        }
        anteater.x = Math.round(anteater.x + Math.cos(anteater.wanderAngle));
        anteater.y = Math.round(anteater.y + Math.sin(anteater.wanderAngle));
        if (anteater.x < 0)      { anteater.x = 0;      anteater.wanderAngle = Math.PI - anteater.wanderAngle; }
        if (anteater.x > W-AW)   { anteater.x = W-AW;   anteater.wanderAngle = Math.PI - anteater.wanderAngle; }
        if (anteater.y < 0)      { anteater.y = 0;       anteater.wanderAngle = -anteater.wanderAngle; }
        if (anteater.y > H-AH)   { anteater.y = H-AH;   anteater.wanderAngle = -anteater.wanderAngle; }
        anteater.el.style.left      = anteater.x + 'px';
        anteater.el.style.top       = anteater.y + 'px';
        anteater.el.style.transform = anteaterTransform(anteater.wanderAngle);
        // frame pitch: 74px per frame at 2× scale
        anteater.sprite.style.backgroundPositionX = -(animTick * 74) + 'px';
    }

    if (cursorItem.style.display !== 'none') {
        if (mode === 'bugs') {
            const s = cursorItem.querySelector('.bug-sprite');
            if (s) s.style.backgroundPositionX = -(bugFrame * 45) + 'px';
        } else {
            const s = cursorItem.querySelector('.anteater-sprite');
            if (s) s.style.backgroundPositionX = -(animTick * 74) + 'px';
        }
    }
}
