
const URL = "https://teachablemachine.withgoogle.com/models/mmPHKqpRF/";
let model, recognizer;

window.onload = () => {
  document.getElementById("startBtn").onclick = async function init() {
    const checkpointURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmAudio.load(checkpointURL, metadataURL);
    recognizer = new tmAudio.AudioRecognizer(model);
    recognizer.listen(prediction => {
      const label = prediction[0]?.className || "Unknown";
      document.getElementById("label").innerText = "Detected: " + label;

      if (label === "Turn on light") {
        document.getElementById("output-img").src = "light-on.png";
      } else if (label === "Play music") {
        document.getElementById("output-img").src = "music.png";
      } else if (label === "Sleep mode") {
        document.getElementById("output-img").src = "sleep.png";
      } else {
        document.getElementById("output-img").src = "off.png";
      }
    }, {
      probabilityThreshold: 0.75
    });
  };
};
