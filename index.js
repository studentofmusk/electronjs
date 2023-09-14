window.electronAPI.getImage((event, data)=>{
    const Image = document.getElementById('Image');
    Image.src = data;
    new Notification("Image Captured", {
        body:"Image has been successfully captured from Live video"
    });
})