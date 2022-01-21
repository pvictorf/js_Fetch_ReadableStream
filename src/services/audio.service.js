export function fetchAudioStream(src, options = {onProgress: () => {}, onFinished: () => {}}) {

  const streamBytes = {
    loaded: 0,
    total: 0,
  } 

  return fetch(new Request(src))
  .then(response => {
    streamBytes.total += parseInt(response.headers.get('Content-Length'));
    return response.body
  })
  .then(body => readChunks(body.getReader()))
  .then(stream => createUrlFromStream(stream))

  function progressHandler(bytesLoaded, totalBytes) {
    streamBytes.loaded += bytesLoaded;
    
    const percentage = Math.round( (streamBytes.loaded * 100) / totalBytes )
    
    return {
      loaded: streamBytes.loaded,
      bytesLoaded,
      totalBytes,
      percentage,   
    }
  }

  function readChunks(reader) {

    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(chunk => {   
            if(chunk.done) {
              controller.close();
              options?.onFinished(progressHandler(0, streamBytes.total));
              return;   
            }
            controller.enqueue(chunk.value);
            options?.onProgress(progressHandler(chunk.value.byteLength, total));
            push();
          }) 
        }
        push();
      },
    })
  }
  
  function createUrlFromStream(stream) {
    const response = new Response(stream);
    return response.blob().then(blob => URL.createObjectURL(blob));
  }

} 

export function playAudio(src) {
  const audioSource = document.querySelector("#audio");
  audioSource.setAttribute('src', src)
}


