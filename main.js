const app = document.getElementById("app");
const catFaces = {
  joy: "😹",
  angry: "😾",
  sad: "😿",
  happy: "😸",
  smug: "😼",
  love: "😻",
  shock: "🙀"
};
updateView();

function updateView() {
  app.innerHTML = "";
  Array.from({ length: 7 }, (_, i) => {
    const divEl = document.createElement("div");
    const buttEl = document.createElement("button");
    const faces = Object.values(catFaces);

    divEl.style.animationDelay = `calc(${-0.6 * i}s)`;
    buttEl.innerHTML = faces[Math.floor(Math.random() * faces.length)];
    buttEl.setAttribute("class", "catFace");
    divEl.addEventListener("click", function () {
      buttEl.innerHTML =
        faces[Math.floor(Math.random() * faces.length)];
      new Sound("hide/arthurabsense (online-video-cutter.com).mp3").play();
    });
    divEl.addEventListener("click", checkFaces);
    divEl.append(buttEl);
    return { div: divEl };
  }).map(
    divObj => app.append(divObj.div)
  );
  if (
    Object.values(app.getElementsByClassName("catFace")).map(catFace => catFace.innerHTML).every((bool,_,arr) => bool === arr[0])
  ) updateView();
}

function checkFaces() {
  document.getElementById("ed").innerHTML = "";
  if (Object.values(document.getElementsByClassName("catFace")).every((face, _, arr) => face.innerHTML === arr[0].innerHTML)) {
    const section = document.createElement("section");
    section.className = "grattis";
    section.innerHTML = `
        <h2>Gratulerer!</h2>
        <p>Alle ansikter matcher!</p>
      `;

    const btn = document.createElement("button");
    btn.innerHTML = "Start på nytt?";
    btn.addEventListener("click", updateView);
    section.append(btn);
    document.getElementById("ed").append(section);
  }
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}