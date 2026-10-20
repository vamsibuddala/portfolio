import { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioData } from '../data/portfolio';

export const AVATAR_TOPICS = {
  intro: {
    id: 'intro',
    label: 'Profile Brief',
    badge: 'Placement Candidate',
    text: `Hello, I'm ${portfolioData.personal.name}. Welcome to my interactive portfolio. I am a first-year MSc Data Science and Artificial Intelligence student at Sheffield Hallam University seeking a placement year. Feel free to explore my machine learning projects and data analytics dashboards.`,
    phonetic: `Hello, I'm ${portfolioData.personal.phoneticName || portfolioData.personal.name}. Welcome to my portfolio. I am an MSc Data Science and Artificial Intelligence student at Sheffield Hallam University seeking a placement year. Feel free to explore my machine learning projects and data analytics dashboards.`,
  },
  skills: {
    id: 'skills',
    label: 'Technical Stack',
    badge: 'AI & Data Tools',
    text: "My technical core includes Python, machine learning with TensorFlow and Keras, interactive business intelligence in Power BI, data preprocessing in Pandas and NumPy, and full-stack development with React and MongoDB.",
    phonetic: "My technical core includes Python, machine learning with TensorFlow and Keras, interactive business intelligence in Power BI, data preprocessing in Pandas and NumPy, and full-stack development with React and MongoDB.",
  },
  projects: {
    id: 'projects',
    label: 'Key Projects',
    badge: 'AI & Dashboards',
    text: "My portfolio includes Civic Care, a crowdsourced platform using deep learning computer vision to automatically detect road hazards, and an AI-based adaptive traffic signal system that optimizes vehicle flow in real time.",
    phonetic: "My portfolio includes Civic Care, a crowdsourced platform using deep learning computer vision to automatically detect road hazards, and an AI-based adaptive traffic signal system that optimizes vehicle flow in real time.",
  },
  goals: {
    id: 'goals',
    label: 'Placement Goals',
    badge: 'Industry Value',
    text: "I am eager to contribute my strong analytical problem-solving skills, data preprocessing experience, and machine learning capabilities to a forward-thinking placement role where I can deliver measurable value.",
    phonetic: "I am eager to contribute my strong analytical problem-solving skills, data preprocessing experience, and machine learning capabilities to a forward-thinking placement role where I can deliver measurable value.",
  }
};

export function useVoiceWelcome() {
  const [isMuted, setIsMuted] = useState(false);
  // Start speaking immediately on mount with initial intro text ready
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [captionText, setCaptionText] = useState(AVATAR_TOPICS.intro.text);
  const [currentTopic, setCurrentTopic] = useState('intro');
  const [waveTrigger, setWaveTrigger] = useState(1);

  // Audio amplitude ref for 60fps visor & soundwave visualizer without re-rendering React
  const audioAmplitudeRef = useRef(0);
  const speechIntervalRef = useRef(null);
  const hasTriggeredInitialRef = useRef(false);

  // Stop current speech
  const stopAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (speechIntervalRef.current) {
      clearInterval(speechIntervalRef.current);
    }
    setIsSpeaking(false);
    audioAmplitudeRef.current = 0;
  }, []);

  // Web Speech API execution with simulated lip-sync / amplitude pulse
  const speakWithSynthesis = useCallback((spokenText, displayText) => {
    if (typeof window === 'undefined') return;

    // Display subtitles immediately
    setCaptionText(displayText);
    setIsSpeaking(true);

    if (speechIntervalRef.current) {
      clearInterval(speechIntervalRef.current);
    }

    // Lip sync amplitude simulation
    let step = 0;
    speechIntervalRef.current = setInterval(() => {
      step += 0.25;
      audioAmplitudeRef.current = isMuted ? 0 : Math.abs(Math.sin(step) * 0.75 + Math.cos(step * 2.1) * 0.25);
    }, 50);

    // If muted or synthesis not supported, simulate visual talking for duration of reading
    if (isMuted || !('speechSynthesis' in window)) {
      const durationMs = Math.min(8000, Math.max(3500, displayText.length * 50));
      setTimeout(() => {
        if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
        setIsSpeaking(false);
        audioAmplitudeRef.current = 0;
      }, durationMs);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 1.02;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v =>
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Daniel") || v.name.includes("David") || v.name.includes("Alex")) &&
        v.lang.startsWith("en")
      ) || voices.find(v => v.lang.startsWith("en"));

      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onend = () => {
        if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
        setIsSpeaking(false);
        audioAmplitudeRef.current = 0;
      };

      utterance.onerror = () => {
        if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
        setIsSpeaking(false);
        audioAmplitudeRef.current = 0;
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  }, [isMuted]);

  // Main topic speak handler
  const speakTopic = useCallback((topicId = 'intro', triggerWaveGesture = true) => {
    const topic = AVATAR_TOPICS[topicId] || AVATAR_TOPICS.intro;
    setCurrentTopic(topicId);

    if (triggerWaveGesture) {
      setWaveTrigger(prev => prev + 1);
    }

    stopAudio();
    speakWithSynthesis(topic.phonetic, topic.text);
  }, [speakWithSynthesis, stopAudio]);

  // Trigger introduction directly on mount without needing button clicks
  useEffect(() => {
    if (hasTriggeredInitialRef.current) return;
    hasTriggeredInitialRef.current = true;

    // Trigger introduction on mount
    const timer = setTimeout(() => {
      speakTopic('intro', true);
    }, 400);

    // If browser suspended audio due to autoplay restrictions, un-suspend on first user touch/move
    const handleFirstInteraction = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      stopAudio();
    };
  }, [speakTopic, stopAudio]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (next) {
        stopAudio();
      } else {
        setTimeout(() => {
          speakTopic(currentTopic, false);
        }, 100);
      }
      return next;
    });
  }, [currentTopic, speakTopic, stopAudio]);

  const replayCurrentTopic = useCallback(() => {
    speakTopic(currentTopic, true);
  }, [currentTopic, speakTopic]);

  const triggerWave = useCallback(() => {
    setWaveTrigger(prev => prev + 1);
  }, []);

  return {
    isMuted,
    isSpeaking,
    audioAmplitudeRef,
    captionText,
    currentTopic,
    waveTrigger,
    speakTopic,
    replayCurrentTopic,
    triggerWave,
    toggleMute,
    stopAudio,
    topicsList: Object.values(AVATAR_TOPICS),
  };
}
