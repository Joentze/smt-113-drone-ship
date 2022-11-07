var ws = new WebSocket("ws://127.0.0.1:5678/"),
                messages = document.createElement('ul');
            ws.onmessage = function (event) {
                let message = event.data
                message = JSON.parse(message)
                let {light, temperat, harvest, error, vibrateX, vibrateY ,orient} = message
                console.log(light, temperat, harvest, error, vibrateX, vibrateY, orient)
                document.getElementById("light-box").innerHTML = light
                document.getElementById("temperature-box").innerHTML = temperat
              //CAPSIZED POP UP                
                if(Math.abs(orient) > 30){
                  document.getElementById("modal-box").style.visibility = "visible"
                  console.log("capsized")
                }
                else{
                  document.getElementById("modal-box").style.visibility = "hidden"
                  console.log("not capsized")
                }
                document.getElementById("harvest-modal-box").style.visibility = "hidden"
                document.getElementById("collision-modal-box").style.visibility = "hidden"
                document.getElementById("error-modal-box").style.visibility = "hidden"
            };
            // document.body.appendChild(messages);
const getWeatherData = ()=>{
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.data.gov.sg/v1/environment/air-temperature")
    xhr.send()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(xhr.response);
        }
      }
}
const sendTelegramMsg = ()=>{
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "https://api.telegram.org/bot5498520650:AAEaMWPf4UDpPGh65jIeedu2vezhUXfrWXE/sendMessage")
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(JSON.stringify({"chat_id":"-857113019","text":"hello"}))    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(xhr.response);
        }
      }
}

