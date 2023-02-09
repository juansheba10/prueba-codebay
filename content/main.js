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
  const lcdScreen = document.querySelector(".lcd-screen")
  const eyeIcon = document.querySelector(".eye-icon")

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      if (button.classList.contains("number")) {
        lcdText.value += button.innerHTML;
        console.log(button.innerHTML)
      } else if (button.classList.contains("button-c")) {
        lcdText.value = "";
      } else if (button.classList.contains("button-save")) {
        if (/^\d+$/.test(lcdText.value)) {
          pin = lcdText.value;
          lcdScreen.style.backgroundColor = "#DEF4DA";
          lcdText.style.backgroundColor = "#DEF4DA"
          lcdText.value = "SAVED";
          setTimeout(function() {
            lcdText.value = "";
            lcdScreen.style.backgroundColor = "#E5F3F2"
            lcdText.style.backgroundColor = "#E5F3F2";
            showEnterPinModal();
          }, 2000);
          button.innerHTML = "ENTER";
          button.classList.remove("button-save");
          button.classList.add("button-enter");
        } else {
          
          eyeIcon.style.display = "none";
          lcdText.value = "NOT A NUMBER";
          lcdText.classList.add("not-number")
          lcdScreen.classList.add("not-number")
          setTimeout(function() {
            lcdText.innerHTML = "";
            eyeIcon.style.display = ""
            lcdText.classList.remove("not-number")
          }, 2000);
        }
      } else if (button.classList.contains("button-enter")) {
        if (lcdText.value === pin) {
          lcdText.value = "Correct";
          eyeIcon.style.display = "none";
          lcdScreen.style.backgroundColor = "#DEF4DA";
          lcdText.style.backgroundColor = "#DEF4DA"
          setTimeout(function() {
            window.location.href = "https://www.codebay-innovation.com/";
          }, 1000);
          
        } else {
          lcdScreen.style.backgroundColor = "#FFE4E4";
          lcdText.style.backgroundColor = "#FFE4E4";
          eyeIcon.style.display = "none"
          lcdText.value = "WRONG";
          setTimeout(function() {
            lcdText.value = "";
            eyeIcon.style.display = ""
            lcdScreen.style.backgroundColor = "#E5F3F2"
            lcdText.style.backgroundColor = "#E5F3F2";
          }, 2000);
          attempts--;
          showErrorModal()
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
    <div class="modal-content-2">
    <img src="/assets/close.png" alt="" class="close-modal-2">
      <p class="bienvenido-2">Introduce tu codigo</p>
      <p class="instrucciones-2">Introduce el codigo de 6 digitos para continuar. (tienes ${attempts} intentos)</p>
    </div>
  `;
  document.body.appendChild(modal);

  document.querySelector(".wall").style.webkitFilter = "blur(5px)"
  const closeModal = document.querySelector(".close-modal-2");
  closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    document.querySelector(".wall").style.webkitFilter = "blur(0)"
  });

  
    

  const lcdText = document.querySelector(".lcd-text");
  lcdText.addEventListener("input", function() {
    if (lcdText.innerHTML === pin) {
      window.location.href = "https://www.codebay-innovation.com/";
    } else if (attempts === 0) {
      window.location.href = "https://policia.es/";
    } else {
      --attempts;
      showErrorModal()
      lcdText.innerHTML = "ERROR";
    }
  });
}

function showErrorModal()  {
  console.log("hola")
  const modalError = document.createElement("div");
  modalError.className = "modal-container";
  modalError.innerHTML = `
  <div class="modal-error">
  <p class="text-error">Por favor, introduzca el código previamente establecido. Tiene ${attempts} intentos restantes. </p>
  </div>
  `;
  setTimeout(() => {
    modalError.innerHTML = "";
  }, 2000);
  
  document.body.appendChild(modalError);
}

  


  // Function to initialize the app
  function init() {
  showSetPinModal();
  handlePinInput();
}

const passwordInput = document.getElementById("passwordInput");
const eyeIcon = document.querySelector(".eye-icon");

eyeIcon.addEventListener("click", function() {
   if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.src = "/assets/visibility.png";
   } else {
     passwordInput.type = "password"
     
      eyeIcon.src = "/assets/visibility_off.png";
   }
});



  
  // Initialize the app on window load
window.addEventListener("load", init);
  
