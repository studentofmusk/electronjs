let capture = document.getElementById('capture');

let img = document.getElementById('image');

let video = document.getElementById('Cam');
    navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
        video.srcObject = stream;
        console.log(stream)
    })

capture.addEventListener('click', ()=>{
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    // img.src = dataUrl;
    window.electronAPI.setImage(dataUrl)
    
    window.electronAPI.destroyWindow();

})
