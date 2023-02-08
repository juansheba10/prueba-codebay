// Variables to store the pin and remaining attempts
let pin = "";
let attempts = 3;

// Function to show the first modal
function showSetPinModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <img src="/assets/close.png" alt="" class="close-modal">
      <p class="bienvenido">Bienvenido a Pinpad</p>
      <p class="instrucciones">Introduce un número de 6 digitos y dale a guardar.
      La próxima vez podrás usar tu número para acceder
      </p>
    </div>
  `;
  
  document.body.appendChild(modal);

  document.querySelector(".wall").style.webkitFilter = "blur(5px)"
  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    document.querySelector(".wall").style.webkitFilter = "blur(0)"
  });
}

// Function to handle the pin input
function handlePinInput() {
  const lcdText = document.querySelector(".lcd-text");
  const buttons = document.querySelectorAll(".button-pad");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      if (button.classList.contains("number")) {
        lcdText.innerHTML += button.innerHTML;
      } else if (button.classList.contains("button-c")) {
        lcdText.innerHTML = "";
      } else if (button.classList.contains("button-save")) {
        if (/^\d+$/.test(lcdText.innerHTML)) {
          pin = lcdText.innerHTML;
          lcdText.innerHTML = "SAVED";
          setTimeout(function() {
            lcdText.innerHTML = "";
          }, 2000);
          button.innerHTML = "ENTER";
          button.classList.remove("button-save");
          button.classList.add("button-enter");
        } else {
          lcdText.innerHTML = "NOT A NUMBER";
          lcdText.classList.add("not-number")
          setTimeout(function() {
            lcdText.innerHTML = "";
            lcdText.classList.remove("not-number")
          }, 2000);
        }
      } else if (button.classList.contains("button-enter")) {
        if (lcdText.innerHTML === pin) {
          window.location.href = "https://www.codebay-innovation.com/";
        } else {
          lcdText.classList.add("wrong")
          lcdText.innerHTML = "WRONG";
          setTimeout(function() {
            lcdText.innerHTML = "";
            lcdText.classList.remove("wrong")
          }, 2000);
          attempts--;
          if (attempts === 0) {
            window.location.href = "https://policia.es/";
          }
        }
      }
    });
  });
}



// Function to show the second modal
function showEnterPinModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <p>Please enter the previously set pin. You have ${attempts} attempts remaining.</p>
    </div>
  `;
  document.body.appendChild(modal);

  const lcdText = document.querySelector(".lcd-text");
  lcdText.addEventListener("input", function() {
    if (lcdText.innerHTML === pin) {
      window.location.href = "https://www.codebay-innovation.com/";
    } else if (--attempts === 0) {
      window.location.href = "https://policia.es/";
    } else {
      lcdText.innerHTML = "ERROR";
      modal.querySelector("p").innerHTML = `Por favor, introduzca el código previamente establecido. Tiene ${attempts} intentos restantes.`;
    }
  });
  }
  
  // Function to initialize the app
  function init() {
  showSetPinModal();
  handlePinInput();
  }
  
  // Initialize the app on window load
  window.addEventListener("load", init);