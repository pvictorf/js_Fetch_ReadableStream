import './style.css'
import * as AudioService from './src/services/audio.service';

const loadingEl = document.querySelector("#loading") 
const audioUrl  = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3'; // './src/storage/audio.mp3'

AudioService.fetchAudioStream(audioUrl, {
  onProgress: ({percentage}) => console.log(`Downloading... ${percentage}%`),
  onFinished: ({percentage}) => console.log('Finished!'),
}).then(source => {
    AudioService.playAudio(source)
});
