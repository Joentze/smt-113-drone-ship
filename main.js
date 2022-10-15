var ws = new WebSocket("ws://127.0.0.1:5678/"),
                messages = document.createElement('ul');
            ws.onmessage = function (event) {
                let message = event.data
                message = JSON.parse(message)
                let {light, temperat, harvest, error, vibrateX, vibrateY ,orient} = message
                console.log(light, temperat, harvest, error, vibrateX, vibrateY, orient)
                document.getElementById("light-box").innerHTML = light
                document.getElementById("temperatur-box").innerHTML = temperat
                // var messages = document.getElementsByTagName('ul')[0],
                //     message = document.createElement('li'),
                //     content = document.createTextNode(event.data);
                // message.appendChild(content);
                // messages.appendChild(message);
            };
            // document.body.appendChild(messages);