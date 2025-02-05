// Inicializa o Parallax
let parallaxInstance;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o Parallax
    var scene = document.getElementById('scene');
    parallaxInstance = new Parallax(scene, {
        relativeInput: true,
        hoverOnly: false
    });

    // Cria dois elementos de áudio para crossfade
    const audio1 = new Audio('assets/sounds/heart-beat.mp3');
    const audio2 = new Audio('assets/sounds/heart-beat.mp3');
    let currentAudio = audio1;
    let nextAudio = audio2;
    let isPlaying = false;

    // Configura os áudios
    audio1.volume = 0.5;
    audio2.volume = 0.5;

    // Função para tocar o próximo áudio antes do atual terminar
    function setupAudioLoop(current, next) {
        current.addEventListener('timeupdate', function() {
            if (current.currentTime >= current.duration - 0.1) {
                next.currentTime = 0;
                next.play();
                let temp = current;
                current = next;
                next = temp;
            }
        });
    }

    // Função para parar os áudios
    function stopAudio() {
        audio1.pause();
        audio2.pause();
        audio1.currentTime = 0;
        audio2.currentTime = 0;
    }

    // Cria botão de som
    const soundButton = document.createElement('button');
    soundButton.innerHTML = 'Iniciar Som';
    soundButton.style.position = 'fixed';
    soundButton.style.bottom = '20px';
    soundButton.style.left = '50%';
    soundButton.style.transform = 'translateX(-50%)';
    soundButton.style.padding = '10px 20px';
    soundButton.style.zIndex = '1000';
    
    soundButton.onclick = function() {
        if (!isPlaying) {
            audio1.play();
            setupAudioLoop(audio1, audio2);
            setupAudioLoop(audio2, audio1);
            this.innerHTML = 'Desligar Som';
            isPlaying = true;
        } else {
            stopAudio();
            this.innerHTML = 'Iniciar Som';
            isPlaying = false;
        }
    };
    
    document.body.appendChild(soundButton);

    // Controles de volume
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' && audio1.volume < 1.0) {
            const newVolume = Math.min(1, audio1.volume + 0.1);
            audio1.volume = newVolume;
            audio2.volume = newVolume;
        } else if (e.key === 'ArrowDown' && audio1.volume > 0) {
            const newVolume = Math.max(0, audio1.volume - 0.1);
            audio1.volume = newVolume;
            audio2.volume = newVolume;
        } else if (e.key === 'm' || e.key === 'M') {
            if (audio1.volume > 0) {
                audio1.volume = 0;
                audio2.volume = 0;
                soundButton.innerHTML = 'Iniciar Som';
                isPlaying = false;
            } else {
                audio1.volume = 0.5;
                audio2.volume = 0.5;
                if (isPlaying) {
                    soundButton.innerHTML = 'Desligar Som';
                }
            }
        }
    });
});