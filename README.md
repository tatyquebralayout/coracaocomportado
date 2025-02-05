# Experimento #3: Coração Comportado 💗

Experimento de visualização poética que explora a sincronização entre elementos visuais, sonoros e interativos. O projeto investiga a relação entre poesia e interface digital através de camadas sobrepostas de animação e interatividade.

## Conceito Experimental ✨

O experimento busca traduzir a dualidade presente no poema (conformidade × rebeldia) em elementos técnicos interativos:

- **Camadas Visuais**: 12 instâncias do mesmo SVG com diferentes opacidades e delays
- **Sincronização**: Batimento cardíaco visual sincronizado com áudio em loop
- **Temporização**: Delays calculados entre elementos visuais e sonoros
- **Profundidade**: Implementação do efeito parallax com profundidades variáveis (0.0 a 2.4)

## Implementação Técnica 🔧

### Sistema de Camadas
```javascript
// Profundidades das camadas (data-depth)
Base:    0.0    // Camada estática
Moldura: 0.02   // Movimento sutil
Corações: 0.2 a 2.4 (incrementos de 0.2)
```

### Manipulação de Cores
- **Filtros CSS**: Combinação de múltiplos filtros para gradiente de cores
```css
filter: invert(11%) sepia(45-100%) saturate(2576-5876%) 
        hue-rotate(0-55deg) brightness(90%) contrast(115%)
```

### Sistema de Áudio
- **Crossfade**: Implementação de dois players de áudio para transição suave
- **Buffer**: Pré-carregamento de 0.1s para evitar gaps
- **Volume**: Controle granular (steps de 0.1)

### Animações
- **Heartbeat**: 6 keyframes com timing específico
```css
@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.15); }
    30% { transform: scale(1); }
    45% { transform: scale(1.08); }
    60% { transform: scale(1); }
}
```

### Tipografia Dinâmica
- **Fonte**: Special Elite (simulação mecânica)
- **Animação**: Entrada sequencial com delays calculados
- **Glitch**: Dupla camada com animação reversa

## Stack Tecnológica 🛠

### Front-end
- **Markup**: HTML5 semântico
- **Estilização**: CSS3
  - Custom Properties
  - Transforms
  - Keyframe Animations
  - CSS Filters
  - Flexbox
- **Comportamento**: JavaScript ES6+
  - Event Listeners
  - Audio API
  - DOM Manipulation
  - State Management

### Bibliotecas
- **Parallax.js v3.1.0**: Gerenciamento de profundidade
- **Google Fonts API**: Tipografia Special Elite

## Métricas e Performance 📊

- **Camadas**: 14 elementos sobrepostos
- **Animações**: 
  - 1 animação principal (heartbeat)
  - 12 variações de cor
  - 5 sequências de texto
- **Áudio**: 
  - Taxa de amostragem: 44.1kHz
  - Duração do loop: ~1s
  - Crossfade: 100ms

## Instalação e Desenvolvimento 💻

1. Clone o repositório:
```bash
git clone https://github.com/tatyquebralayout/coracaocomportado.git
```

2. Abra `index.html` em um servidor local
3. Para desenvolvimento, monitore:
   - Sincronização de áudio
   - Performance das animações
   - Comportamento do parallax

## Estrutura do Projeto 📁

```
.
├── assets/
│   ├── images/
│   │   ├── base.png      # Camada base (depth: 0.0)
│   │   ├── heart.svg     # Elemento replicado
│   │   └── moldura.png   # Overlay decorativo
│   └── sounds/
│       └── heart-beat.mp3 # Loop de batimento
├── css/
│   └── style.css        # Estilos e animações
├── js/
│   └── main.js          # Controladores e eventos
└── index.html           # Estrutura DOM
```

## Créditos 🙏

- **Conceito & Poesia**: "Coração Comportado"
- **Desenvolvimento**: [@tatyquebralayout](https://github.com/tatyquebralayout)
- **Engine**: [Parallax.js](https://github.com/wagerfield/parallax)

## Licença 📄

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.