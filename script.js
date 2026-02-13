const gifStages = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a3g2Njhrd3Nseml4aXVubG91c3F5eWd6eHB6MzVyN3Z3b2x3a2E3dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wMXSYpRrnK2dvM0Tyj/giphy.gif",    // 0 normal
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTlidXNlZ2JicnB3YTg0c29wN3BydndjcmU5ejg5OHQ2dDU1NWQycyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5XRB3Ay93FZw4/giphy.gif",  // 1 confused
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanNqYmM4NWoxd2l1bzh6ZTRwOWhpYWtuaHF0M3kya2lxem9laDZ0byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HTjuQryixrSZB1uA3Z/giphy.gif",             // 2 pleading
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a2J4ajRjMmYyMG5ld296N2FzZ2VveWlvMjZ1b2F4ZGEwbXB6ZjM0NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/p1b9zNAQzlhrTtAOJ5/giphy.gif",             // 3 sad
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZHFpeTdtcjV0bHU0Znc2YnhjMGl0Z3ZzaDRyZ3E3aHNqa3owZzZpNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j0qSbeNFuzjhXKFVSP/giphy.gif",       // 4 sadder
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YXRid21mY2F5ZGdjOG5wbWtqeDJjZXdxejB5NzJkZXdqem5pZXJxciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rdKs1wbHapaQ8/giphy.gif",             // 5 weinendes Lama
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cDB1eTdyMGJjYjVneDZyancxZmlpcGc1bTQ3dDhkZmg2a3JvdDV6ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/b8dC9xhIw1VPsnxmCt/giphy.gif",               // 6 Weinen im Regen
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnNveHBhYXRmYm5mdHcwam1nNHlkNGRwNTNjcnRldmhlbWFvcmpiaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fb5lozVxhBwVFFByW8/giphy.gif"  // 7 Herz zerbricht
]

const noMessages = [
    "Nein",
    "Würdest du dich nicht freuen? 🤔",
    "Was?! Steeeefaaaan... 🥺",
    "Wenn du nein sagst, dann bin ich schon enttäuscht...",
    "Ich wäre wirklich sehr traurig... 😢",
    "Bitteeeeeeee??? 💔",
    "Das ist so gemein von dir...",
    "Letzte Chance! 😭",
    "Hahaahahhah diesen Button kannst du sowieso nicht treffen 😜"
]

const yesTeasePokes = [
    "du fragst dich sicher, was passiert, wenn du ablehnst ... versuch es mal",
    "Mach weiter, lehne ruhig meine Einladung ab",
    "du verpasst etwas😈",
    "Traust du dich etwa nicht? 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let yesClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}


function handleYesClick() {
    yesClickCount++;

    // Solange wir noch nicht beim 7. Klick sind:
    if (yesClickCount < 7) {
        // Nachricht aus deiner existierenden Liste holen
        // Das % Zeichen sorgt dafür, dass die Liste von vorne anfängt, falls sie kürzer als 7 Einträge ist
        const msg = yesTeasePokes[(yesClickCount - 1) % yesTeasePokes.length];
        
        showTeaseMessage(msg);

        // Optional: Button wackeln lassen (Nein-Geste)
        const btn = document.getElementById('yes-btn');
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);

        return; // HIER IST STOPP -> Keine Weiterleitung
    }

    // Ab dem 7. Klick passiert das hier:
    showTeaseMessage("Ja klar! 🎉"); // Dein gewünschter Text

    // Kleine Pause (800ms), damit man "Ja klar!" lesen kann, dann ab zur Zielseite
    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 800);
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
