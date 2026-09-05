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
      Array.from({ length: 5 }, (_,i) => {
      const divEl = document.createElement("div");
      const spanEl = document.createElement("div");
      const faces = Object.values(catFaces);
      
      divEl.style.animationDelay = `calc(${-0.6 * i}s)`;
      spanEl.innerHTML = faces[Math.floor(Math.random() * faces.length)];
      spanEl.setAttribute("class", "catFace");
      divEl.addEventListener("click", function() {
        spanEl.innerHTML =
          faces[Math.floor(Math.random() * faces.length)];
      });
      divEl.addEventListener("click", checkFaces);
      divEl.append(spanEl);
      return { div: divEl };
    }).map(
      divObj => app.append(divObj.div)
    );
  }

  function checkFaces(){
    document.getElementById("ed").innerHTML = "";
    if (Object.values(document.getElementsByClassName("catFace")).every((face,_,arr) => face.innerHTML === arr[0].innerHTML)){
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
