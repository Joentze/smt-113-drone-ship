
var ws = new WebSocket("ws://127.0.0.1:5678/"),
                messages = document.createElement('ul');
            ws.onmessage = function (event) {
                let message = event.data
                message = JSON.parse(message)
                console.log(message)
                let {light, temperat, harvest, error, vibrateX, vibrateY ,orient, N, P, K} = message
                console.log(light, temperat, harvest, error, vibrateX, vibrateY, orient, N, P, K)
                document.getElementById("n-box").innerHTML = `N: ${Math.round(5*Math.random() )}`
                document.getElementById("p-box").innerHTML = `P: ${Math.round(5*Math.random() )}`
                document.getElementById("k-box").innerHTML = `K: ${Math.round(5*Math.random() )}`
                document.getElementById("light-box").innerHTML = `🔆: ${light}`
                document.getElementById("temperature-box").innerHTML = `🌡: ${temperat}`
                if(light<10){
                  document.getElementById("light-box").style.color = "rgb(239 68 68)"
                }else{
                  document.getElementById("light-box").style.color = "rgb(0 0 0)"
                }
                if(temperat>28){
                  document.getElementById("temperature-box").style.color = "rgb(239 68 68)"
                }else{
                  document.getElementById("temperature-box").style.color = "rgb(0 0 0)"
                }
              //CAPSIZED POP UP                
                if(Math.abs(orient) > 30){
                  document.getElementById("modal-box").style.visibility = "visible"
                }
                else{
                  document.getElementById("modal-box").style.visibility = "hidden"
                }
              //HARVEST POP UP
                if (harvest === 1){
                  document.getElementById("harvest-modal-box").style.visibility = "visible"
                }
                
              //COLLISION POP UP
                if (Math.abs(vibrateX)>400 || Math.abs(vibrateY)>400){
                  console.log("bang")
                  document.getElementById("collision-modal-box").style.visibility = "visible"
                }
                // else{
                //   document.getElementById("collision-modal-box").style.visibility = "hidden"
                // }
              //ERROR POP UP
                // if(error===1){
                //   document.getElementById("error-modal-box").style.visibility = "hidden"
                // }
                // else{
                //   document.getElementById("error-modal-box").style.visibility = "visble"
                // }
            };
            // document.body.appendChild(messages);


const MESSAGES = {
  harvest:"🎉🌾 Cameras on Drone Ship 1 have detected that crops are ready for harvest. Drone Ship 1 is en-route back to base, do facilitate procedure at dock 2",
  error:"❌ Sensors on board have detected an error. Do check it out and remedy immediately!",
  collision:"⚠️ Vibration sensors have detected a heavy collision with an unknown object, do check it out ASAP!",
  capsized:"⛴💀 Gyroscopic sensors on Drone Ship 1 have detected a high likelihood of a capsize, send a team out to save it immediately!"
}

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
const sendTelegramMsg = (message)=>{
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "https://api.telegram.org/bot5498520650:AAEaMWPf4UDpPGh65jIeedu2vezhUXfrWXE/sendMessage")
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(JSON.stringify({"chat_id":"-857113019","text":message}))    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(xhr.response);
        }
      }
}
const makeHidden=(id)=>{
  console.log("yeet")
  document.getElementById(id).style.visibility = "hidden"
}

// document.getElementById("collision-modal-box").style.visibility = "hidden"

const capsizeEl = document.getElementById("modal-box-btn")
const capsizeBtn =()=> sendTelegramMsg(MESSAGES["capsized"])
const capsizeCancel =()=>makeHidden("modal-box")

const harvestEl = document.getElementById("harvest-modal-box")
const harvestBtn =()=> sendTelegramMsg(MESSAGES["harvest"])
const harvestCancel =()=>makeHidden("harvest-modal-box")

const collisionEl = document.getElementById("collision-modal-box")
const collisionBtn =()=> sendTelegramMsg(MESSAGES["collision"])
const collisionCancel =()=>makeHidden("collision-modal-box")

const errorEl = document.getElementById("error-modal-box")
const errorBtn =()=> sendTelegramMsg(MESSAGES["error"])
const errorCancel =()=>makeHidden("error-modal-box")
