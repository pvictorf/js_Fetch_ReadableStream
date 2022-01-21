import './style.css'
import * as AudioService from './src/services/audio.service';

const loadingEl = document.querySelector("#loading") 

AudioService.fetchAudioStream('./src/storage/audio.mp3', {
  onProgress: ({percentage}) => loadingEl.innerHTML += `<p>${percentage}%</p>`,
  onFinished: ({percentage}) => loadingEl.innerHTML += `<p>Finished!</p>`,
}).then(source => {
    AudioService.playAudio(source)
});
