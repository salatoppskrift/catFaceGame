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
updateView(Object.values(catFaces));

function updateView(catFacesArr) {
  app.innerHTML = "";
  document.getElementById("ed").innerHTML = "";
  const annerkjennelse = document.createElement("p");
  annerkjennelse.innerHTML = `Lydkilde: tiktok@sirarthurmeows`;
  const faces = catFacesArr;

  Array.from({ length: 7 }, (_, i) => {
    const divEl = document.createElement("div");
    const buttEl = document.createElement("button");

    divEl.style.animationDelay = `calc(${-0.6 * i}s)`;
    buttEl.innerHTML = randomise(faces, Math.random);
    buttEl.setAttribute("class", "catFace");
    divEl.addEventListener("click", function () {
      buttEl.innerHTML = randomise(faces, Math.random);
      new Sound("hide/arthurabsense (online-video-cutter.com).mp3").play();
    });
    divEl.addEventListener("click", checkFaces);
    divEl.append(buttEl);
    return { div: divEl };
  }).map(
    divObj => app.append(divObj.div)
  );
  app.append(annerkjennelse);
  if (
    Object.values(app.getElementsByClassName("catFace")).map(catFace => catFace.innerHTML).every((bool, _, arr) => bool === arr[0])
  ) updateView(catFacesArr);
}

function checkFaces() {
  if (Object.values(document.getElementsByClassName("catFace")).every((face, _, arr) => face.innerHTML === arr[0].innerHTML)) {
    const section = document.createElement("section");
    section.className = "grattis";
    section.innerHTML = `
        <h2>Gratulerer!</h2>
        <p>Alle ansikter matcher!</p>
      `;

    Object.values(document.getElementsByClassName("catFace")).map(face => {
      if (face instanceof HTMLButtonElement) {
        face.disabled = true;
        face.style.cursor = "not-allowed";
      }
    })

    const btn = document.createElement("button");
    btn.innerHTML = "Start på nytt?";
    btn.addEventListener("click", updateView);
    section.append(btn);
    document.getElementById("ed").append(section);
  }
}

function randomise(strArr, func) {
  try {
    if (!Array.isArray(strArr) || !(func instanceof Function))
      throw [Array.isArray(strArr), func instanceof Function];

    return strArr[Math.floor(func() * strArr.length)];
  } catch (err) {
    console.log(`En eller flere av parametre ${err} er noe manglende.`);
  }
}

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}