// 캐릭터별 음성 설정
const voiceSettings = {
  'Tom': {
    pitch: 0.9,
    rate: 1.0,
    voiceIndex: 0, // 남성
  },
  'Emma': {
    pitch: 1.2,
    rate: 1.0,
    voiceIndex: 1, // 여성
  },
  'Mountain Troll': {
    pitch: 0.6,
    rate: 0.9,
    voiceIndex: 0,
  },
  'Forest Troll': {
    pitch: 0.65,
    rate: 0.95,
    voiceIndex: 0,
  },
  'Bridge Troll': {
    pitch: 0.7,
    rate: 0.9,
    voiceIndex: 0,
  },
  'Cave Troll': {
    pitch: 0.6,
    rate: 0.85,
    voiceIndex: 0,
  },
  'Troll King': {
    pitch: 0.55,
    rate: 0.9,
    voiceIndex: 0,
  },
  'Eagle': {
    pitch: 1.1,
    rate: 1.1,
    voiceIndex: 1,
  },
  'Rabbit': {
    pitch: 1.3,
    rate: 1.15,
    voiceIndex: 1,
  },
  'Goat': {
    pitch: 0.8,
    rate: 0.95,
    voiceIndex: 0,
  },
  'Bat': {
    pitch: 1.15,
    rate: 1.1,
    voiceIndex: 1,
  },
  'Baby Troll': {
    pitch: 1.2,
    rate: 1.0,
    voiceIndex: 1,
  },
  'Dad Troll': {
    pitch: 0.65,
    rate: 0.85,
    voiceIndex: 0,
  },
  'Little Troll': {
    pitch: 1.1,
    rate: 1.05,
    voiceIndex: 1,
  },
};

function speakText(text, character) {
  // 기존 발화 중단
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const settings = voiceSettings[character] || voiceSettings['Tom'];

  // 음성 설정
  utterance.pitch = settings.pitch;
  utterance.rate = settings.rate;
  utterance.volume = 1;

  // 음성 선택 (사용 가능한 음성 중에서)
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    // 영어 음성 선택
    const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
    if (englishVoices.length > settings.voiceIndex) {
      utterance.voice = englishVoices[settings.voiceIndex];
    } else if (englishVoices.length > 0) {
      utterance.voice = englishVoices[0];
    }
  }

  speechSynthesis.speak(utterance);
}

// 버튼 클릭 시 음성 재생
document.addEventListener('DOMContentLoaded', function() {
  const speakButtons = document.querySelectorAll('.speak-btn');

  speakButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const dialogueItem = this.closest('.dialogue-item');
      const character = dialogueItem.querySelector('.character-badge').textContent;
      const englishText = dialogueItem.querySelector('.english-text').textContent;

      // 재생 중 표시
      this.classList.add('speaking');

      // 음성 재생
      speakText(englishText, character);

      // 재생 완료 후 표시 제거
      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.onend = () => {
        this.classList.remove('speaking');
      };
    });
  });

  // 음성 로드 완료 후 재설정
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function() {
      // 음성 재로드
    };
  }
});
