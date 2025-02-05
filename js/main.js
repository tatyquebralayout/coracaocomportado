// Variável global para a instância do Parallax
let parallaxInstance;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o efeito Parallax na cena
    var scene = document.getElementById('scene');
    parallaxInstance = new Parallax(scene, {
        relativeInput: true,  // Movimento relativo ao centro da cena
        hoverOnly: false      // Ativa mesmo sem hover
    });

    // Cria dois elementos de áudio para crossfade suave
    const audio1 = new Audio('assets/sounds/heart-beat.mp3');
    const audio2 = new Audio('assets/sounds/heart-beat.mp3');
    let currentAudio = audio1;
    let nextAudio = audio2;
    let isPlaying = false;

    // Configura o volume inicial dos áudios
    audio1.volume = 0.5;
    audio2.volume = 0.5;

    // Função para criar um loop contínuo entre os dois áudios
    // Isso evita gaps entre as repetições do som
    function setupAudioLoop(current, next) {
        current.addEventListener('timeupdate', function() {
            // Quando faltar 0.1s para terminar, inicia o próximo áudio
            if (current.currentTime >= current.duration - 0.1) {
                next.currentTime = 0;
                next.play();
                // Troca os áudios para o próximo ciclo
                let temp = current;
                current = next;
                next = temp;
            }
        });
    }

    // Função para parar todos os áudios e resetar
    function stopAudio() {
        audio1.pause();
        audio2.pause();
        audio1.currentTime = 0;
        audio2.currentTime = 0;
    }

    // Cria e configura o botão de controle de som
    const soundButton = document.createElement('button');
    soundButton.innerHTML = 'Iniciar Som';
    soundButton.style.position = 'fixed';
    soundButton.style.bottom = '20px';
    soundButton.style.left = '50%';
    soundButton.style.transform = 'translateX(-50%)';
    soundButton.style.padding = '10px 20px';
    soundButton.style.zIndex = '1000';
    
    // Adiciona o comportamento de toggle ao botão
    soundButton.onclick = function() {
        if (!isPlaying) {
            // Inicia o som
            audio1.play();
            setupAudioLoop(audio1, audio2);
            setupAudioLoop(audio2, audio1);
            this.innerHTML = 'Desligar Som';
            isPlaying = true;
        } else {
            // Para o som
            stopAudio();
            this.innerHTML = 'Iniciar Som';
            isPlaying = false;
        }
    };
    
    // Adiciona o botão ao corpo do documento
    document.body.appendChild(soundButton);

    // Controles de volume via teclado
    document.addEventListener('keydown', function(e) {
        // Seta para cima: aumenta o volume
        if (e.key === 'ArrowUp' && audio1.volume < 1.0) {
            const newVolume = Math.min(1, audio1.volume + 0.1);
            audio1.volume = newVolume;
            audio2.volume = newVolume;
        } 
        // Seta para baixo: diminui o volume
        else if (e.key === 'ArrowDown' && audio1.volume > 0) {
            const newVolume = Math.max(0, audio1.volume - 0.1);
            audio1.volume = newVolume;
            audio2.volume = newVolume;
        } 
        // Tecla M: muta/desmuta o som
        else if (e.key === 'm' || e.key === 'M') {
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