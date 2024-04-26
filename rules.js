class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title DONE
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story DONE
    }
}

class InputCode extends Scene {
    create() {
        this.engine.show("Enter the code:");
        let inputField = this.engine.actionsContainer.appendChild(document.createElement("input"));
        inputField.type = "text";
        inputField.id = "codeInput";
        let submitButton = this.engine.actionsContainer.appendChild(document.createElement("button"));
        submitButton.innerText = "Submit";
        submitButton.onclick = () => {
            let inputCode = document.getElementById("codeInput").value;
            this.handleChoice(inputCode);
        };
    }

    handleChoice(inputCode) {
        if (inputCode === "310") {
            this.engine.show("The code is correct!");
            this.engine.gotoScene(Location, "Basement");
        } else {
            this.engine.show("Incorrect code. Try again.");
        }
    }
}


class Location extends Scene {
    create(key) {
        console.log("Key:", key);
        let locationData = this.engine.storyData.Locations[key];
        console.log("Location Data:", locationData);
        if (locationData) {
            this.engine.show(locationData.Body);
            if (locationData.Choices && locationData.Choices.length > 0) {
                for (let choice of locationData.Choices) {
                    this.engine.addChoice(choice.Text, choice);
                }
            } else {
                this.engine.addChoice("The end.");
            }
    }
    }

    handleChoice(choice) {
        if (choice && choice.Target) {
            if (choice.Target === "Attempt code") {
                // Redirect to the 'InputCode' scene
                this.engine.gotoScene(InputCode);
            } else if (choice.Target === "PickUpKey") {
                // Picking up the key
                this.engine.hasKey = true; 
                this.engine.show("You picked up the key. The lights flicker as you stand in the room where the key once was. Perhaps you should check your locations again.");
                this.engine.gotoScene(Location, "Ukraine");
            } else if (choice.Target === "Opening through the globe") {
                // Pulling out the key
                if (this.engine.hasKey) {
                    this.engine.show("You take out the key.");
                    this.engine.gotoScene(Location, "Opening through the globe");
                } else {
                    this.engine.show("You don't have the key to take out.");
                    this.engine.gotoScene(Location, "Tenochtitlan");
                }
            } else {
                // Redirect
                this.engine.show("> " + choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            // Redirect to the 'End' scene if no choice or target is provided
            this.engine.gotoScene(End);
        }
    }
}    

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');