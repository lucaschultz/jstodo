const InvalidObjectError = require("./errors/object.js");

class Validate {

    // Validiere ein item Object gemäß den Vorgaben
    static ITEM (obj) {
        let keyAnmount;

        // Teste ob die Anzahl der Properties festgestellt werden kann
        try {
            keyAnmount = Object.keys(obj).length;
        } catch (err) {
            throw new InvalidObjectError(`Object isn't conform to an item, error getting the anmount of properties`);
        }

        // Teste ob die Anzahl der Properties mit der erwarteten übereinstimmt
        // Wegen der gelösten Teilaufgaben im ersten Teil genau 4 Properties erwartet
        if (keyAnmount !== 4) {
            throw new InvalidObjectError(`Object isn't conform to an item, expected 4 properties has ${keyAnmount}`);
        }

        // Teste ob die Property name definiert und ein string ist
        if (typeof obj.name !== "string") {
            throw new InvalidObjectError(`Object isn't conform to an item, property 'name' should be a string but is ${typeof obj.name}`);
        }

        // Teste ob die Property deadline definiert und ein string ist
        if (typeof obj.deadline !== "string") {
            throw new InvalidObjectError(`Object isn't conform to an item, property 'deadline' should be a string but is ${typeof obj.deadline}`)
        }
        
        // Teste ob die Property workloadFactor definiert und eine number ist
        if (typeof obj.workloadFactor !== "number") {
            throw new InvalidObjectError(`Object isn't conform to an item, property 'workloadFactor' should be a number but is ${typeof obj.workloadFactor}`)
        }
        
        // Teste ob die Property done definiert und ein boolean ist
        if (typeof obj.done !== "boolean") {
            throw new InvalidObjectError(`Object isn't conform to an item, property 'done' should be a boolean but is ${typeof obj.done}`)
        }
    }

    // Validiere ein item list Object gemäß den Vorgaben
    static LIST (obj, barebones = true) {
        let keyAnmount;
        const expectedkeyAnmount = barebones ? 1 : 2;
        
        // Teste ob die Anzahl der Properties festgestellt werden kann
        try {
            keyAnmount = Object.keys(obj).length;
        } catch (err) {
            throw new InvalidObjectError(`Object isn't conform to a list, error getting the anmount of properties`);
        }

        // Teste ob die Anzahl der Properties mit der erwarteten übereinstimmt
        if (keyAnmount !== expectedkeyAnmount) {
            throw new InvalidObjectError(`Object isn't conform to a ${barebones ? 'barebones' : ''} list, expected ${expectedkeyAnmount} properties has ${keyAnmount}`);
        }

        // Teste ob die Property name definiert und ein string ist
        if (typeof obj.name !== "string") {
            throw new InvalidObjectError(`Object isn't conform to a list, property 'name' should be a string but is ${typeof obj.name}`);
        }

        // Falls eine komplette Liste erwartet wird
        if (!barebones) {
            // Teste ob die Property items definiert und ein Array ist
            if (!Array.isArray(obj.items)) {
                throw new InvalidObjectError(`Object isn't conform to a list, property 'items' should be an Array but is ${typeof obj.items}`);
            }

            // Für jedes object im Array items
            obj.items.forEach(item => {
                try {
                    // Teste ob es einem Item conform ist
                    this.ITEM(item);
                } catch (err) {
                    if (err.name === 'InvalidObjectError') {
                        throw new InvalidObjectError(`Object isn't conform to a list, contains non-conform item: '${err.message}'`);
                    } else {
                        throw err;
                    }
                }
            });
        }
    }

    // Validiere ein user Object gemäß den Vorgaben
    static USER (obj, barebones = true) {
        let keyAnmount;
        const expectedkeyAnmount = barebones ? 1 : 2;
        
        // Teste ob die Anzahl der Properties festgestellt werden kann
        try {
            keyAnmount = Object.keys(obj).length;
        } catch (err) {
            throw new InvalidObjectError(`Object isn't conform to a user, error getting the anmount of properties`);
        }

        // Teste ob die Anzahl der Properties mit der erwarteten übereinstimmt
        if (keyAnmount !== expectedkeyAnmount) {
            throw new InvalidObjectError(`Object isn't conform to a ${barebones ? 'barebones' : ''} user, expected ${expectedkeyAnmount} properties has ${keyAnmount}`);
        }

        // Teste ob die Property user definiert und ein string ist
        if (typeof obj.user !== "string") {
            throw new InvalidObjectError(`Object isn't conform to a user, property 'user' should be a string but is ${typeof obj.user}`);
        }

        // Falls eine kompletter User erwartet wird
        if (!barebones) {
            // Teste ob die Property lists definiert und ein Array ist
            if (!Array.isArray(obj.lists)) {
                throw new InvalidObjectError(`Object isn't conform to a user, property 'lists' should be an Array but is ${typeof obj.lists}`);
            }

            // Für jedes object im Array lists
            obj.lists.forEach(list => {
                try {
                    // Teste ob es einer list conform ist
                    this.LIST(list, false);
                } catch (err) {
                    if (err.name === 'InvalidObjectError') {
                        throw new InvalidObjectError(`Object isn't conform to a user, contains non-conform list: '${err.message}'`);
                    } else {
                        throw err;
                    }
                }
            });
        }
    }
}

module.exports = Validate;