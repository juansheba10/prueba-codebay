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
        if (lcdText.value.length < 6) {
          lcdText.value += button.innerHTML;
        }
      } else if (button.classList.contains("button-c")) {
        lcdText.value = "";
      } else if (button.classList.contains("button-save")) {
        if (/^\d+$/.test(lcdText.value)) {
          pin = lcdText.value;
          lcdText.type = "text"
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
            lcdText.value = "";
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


//Function to hide or make visible the password

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
  
