let recorder, chunks = [];

async function iniciarVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = salvarVideo;

  recorder.start();
  setTimeout(() => recorder.stop(), 60000); // 1 min
}

function salvarVideo() {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);

  const video = document.createElement("video");
  video.src = url;
  video.controls = true;

  document.getElementById("entradas").prepend(video);
  chunks = [];
}

function blobParaBase64(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const base64 = await blobParaBase64(blob);

videos.push({
  data: new Date().toLocaleString(),
  arquivo: base64
});

localStorage.setItem("videos", JSON.stringify(videos));
const video = document.createElement("video");
video.src = v.arquivo;
video.controls = true;

