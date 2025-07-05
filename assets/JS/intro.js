//  function goToJarvis() {
//             window.location.href = "./chatbot.html"; // Update this to your actual assistant page
//         }
         const jarvis = document.getElementById("jarvis");
      const jarvisintro = document.getElementById("enterbtn");
      jarvisintro.addEventListener("click" , () => {
        jarvis.play();
       window.open("chatbot.html");
      });

