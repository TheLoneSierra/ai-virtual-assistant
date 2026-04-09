// Utility functions for virtual assistant actions

export const speakResponse = (response) => {
  if (response && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(utterance);
  }
};

export const openUrlBasedOnType = (type, userInput) => {
  const encodedInput = encodeURIComponent(userInput || "");

  console.log(
    `[Action] Opening URL for type: ${type}, userInput: ${userInput}`,
  );

  switch (type) {
    case "google_search":
      console.log(
        `[Action] Opening Google search: https://www.google.com/search?q=${encodedInput}`,
      );
      window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
      break;
    case "youtube_search":
      console.log(
        `[Action] Opening YouTube search: https://www.youtube.com/search?q=${encodedInput}`,
      );
      window.open(`https://www.youtube.com/search?q=${encodedInput}`, "_blank");
      break;
    case "youtube_play":
      console.log(
        `[Action] Opening YouTube play: https://www.youtube.com/search?q=${encodedInput}`,
      );
      window.open(`https://www.youtube.com/search?q=${encodedInput}`, "_blank");
      break;
    case "calculator_open":
      console.log("[Action] Opening calculator");
      window.open("https://www.google.com/search?q=calculator", "_blank");
      break;
    case "instagram_open":
      console.log("[Action] Opening Instagram");
      window.open("https://www.instagram.com", "_blank");
      break;
    case "facebook_open":
      console.log("[Action] Opening Facebook");
      window.open("https://www.facebook.com", "_blank");
      break;
    case "weather_show":
      console.log("[Action] Opening Weather");
      window.open("https://www.google.com/search?q=weather", "_blank");
      break;
    default:
      console.log(`[Action] No action needed for type: ${type}`);
      break;
  }
};
