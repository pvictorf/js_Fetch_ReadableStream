import './style.css'
import * as AudioService from './src/services/audio.service';

const loadingEl = document.querySelector("#loading") 
const audioUrl  = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3'; // './src/storage/audio.mp3'

AudioService.fetchAudioStream(audioUrl, {
  onProgress: ({percentage}) => loadingEl.innerHTML += `<p>${percentage}%</p>`,
  onFinished: ({percentage}) => loadingEl.innerHTML += `<p>Finished!</p>`,
}).then(source => {
    AudioService.playAudio(source)
});
