function countPerPlayerFactor(x) {
    return Math.trunc(n / x)
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

const fivePlayers = [
    "a",
    "b",
    "c",
    "d",
    "e"
]

const players = [
    "Karishma",
    "Ed Burns",
    "Adam Chow",
    "Archana Pamarthi",
    "Lucas Chen",
    "Chandra Divi",
    "Rod Strougo",
    "Anshu Soni",
    "Shaffaly Talwar",
    "Sumit Zamadar",
    "Chaitu Yantrapraganda",
    "Jossie McManus",
    "Bharath Gurrala",
    "Shree Harsha",
    "Jinsong Liu",
    "Himaja Sonthi",
    "Chris Crenchaw",
    "Ambika Soorappaiah",
    "Gaurav Gopalkrishna",
    "Allen Zhao",
    "Daniel Ochoa",
    "Chase Fulford",
    "Mehga Naik Prakash",
    "Tal Raichman",
    "Chandrakanth Baladhadrapatruni",
    "Anupam Sapre",
    "Kevin Desai",
    "Manuel Perez",
    "Daniel Gemzer",
    "Denise Smith",
    "Renan Medina",
    "Kevin Murray",
    "Sakshi Sakshi",
    "Reena Singh Kshatriya",
    "Bhuvanesh Shanmuga Sundaram"
]

var playerListToUse = players

// Player Count
const n = playerListToUse.length

const minusRoles = [
    {
        name: "Werewolf",
        value: -6,
        count: Math.min(countPerPlayerFactor(6), 12)
    },
    {
        name: "Big Bad Wolf",
        value: -9,
        count: Math.min(countPerPlayerFactor(30), 1)
    },
    {
        name: "Tanner",
        value: -2,
        count: Math.min(countPerPlayerFactor(10), 1)
    },
    {
        name: "Cursed",
        value: -3,
        count: Math.min(countPerPlayerFactor(20), 1)
    },
    {
        name: "Cupid",
        value: -3,
        count: Math.min(countPerPlayerFactor(20), 1)
    },
    {
        name: "Virginia Wolf",
        value: -2,
        count: Math.min(countPerPlayerFactor(15), 1)
    }
]

const plusRoles = [
    {
        name: "Seer",
        value: 7,
        count: 1
    },
    {
        name: "Village Idiot",
        value: 2,
        count: 1
    },
    {
        name: "Hunter",
        value: 3,
        count: 1
    },
    {
        name: "Huntress",
        value: 3,
        count: 1
    },
    {
        name: "Apprentice Seer",
        value: 4,
        count: 1
    },
    {
        name: "Mason",
        value: 2,
        // Need to add code for flexing this number
        count: 3
    }
    ,
    {
        name: "Mayor",
        value: 2,
        // Need to add code for flexing this number
        count: 1
    }
    ,
    {
        name: "Tough Guy",
        value: 3,
        // Need to add code for flexing this number
        count: 1
    }
]

function generateRoles() {
    var badRoles = []
    var negativeRoleScore = 0

    // Add minus roles based on count alone
    for (const roleIndex in minusRoles) {
        var role = minusRoles[roleIndex]
        for (let i = 0; i < role.count; i++) {
            if (role.name === "Big Bad Wolf") {
                badRoles.splice(0,1)
                negativeRoleScore += 6
            }
            badRoles.push(role.name)
            negativeRoleScore += role.value
        }
    }

    console.log("Here are the negative value roles added: " + badRoles)

    // How many positive roles do we need?
    const positiveRoleCount = n - badRoles.length

    console.log("We have " + n +  " players")
    console.log("We have " + badRoles.length + " negative value roles")
    console.log("We need " + positiveRoleCount + " positive roles")
    console.log("Our total score for negative roles is: " + negativeRoleScore)

    console.log("Let's fill with villagers and start replacing until our score is balanced.")
    const scoreIfWeJustAddedVillagers = negativeRoleScore + positiveRoleCount
    console.log("If we added " + positiveRoleCount + " Villagers then our score difference would be: " + (scoreIfWeJustAddedVillagers))

    if (scoreIfWeJustAddedVillagers < 0) {
        console.log("We need to add special villager roles!")
    } else if (scoreIfWeJustAddedVillagers > 3) {
        console.log("Oh man...looks like we actually need more bad role.  Well I don't have code for that yet.")
        return;
    } else {
        console.log("Well dang.  I guess we're good with just villagers.  I don't really have code for that yet either.")
        return;
    }
    
    console.log("We will replace villagers with other positive score roles in the same order as they are entered")

    var specialVillagerRoles = []
    var scoreForSpecialVillagerRoles
    var differential = scoreIfWeJustAddedVillagers

    // Start adding special villager roles.  Our goal is for total positive score to be >= our negative score.
    for (const roleIndex in plusRoles) {
        var initialCount = specialVillagerRoles.length
        var scoreForNewRoles = 0
        var role = plusRoles[roleIndex]

        for (let i = 0; i < role.count; i++) {
            specialVillagerRoles.push(role.name)
            scoreForNewRoles += role.value
        }

        // Add the score for our new special villagers roles to our total special villager score
        scoreForSpecialVillagerRoles += scoreForNewRoles

        // Calculate the new differential to see if filling with villagers would be ok
        var countOfAddedRoles = specialVillagerRoles.length - initialCount
        // Subtract a villager for each new special role added, and add the score for the newly added roles
        differential = differential - countOfAddedRoles + scoreForNewRoles

        if (differential >= 0) {
            console.log("We did it!  We have a net positive score and can proceed with this set of" + 
            "special villagers, filling the rest of the slots with normal villagers.")
            break;
        }
    }
    
    console.log("OK...we've now collected our set of special villager roles with a new differential of: " + differential)
    console.log("Here are the special villager roles: " + specialVillagerRoles)

    // Now we need to combine our lists, and map it to a randomized version of the player list.
    var allRoles = badRoles.concat(specialVillagerRoles)
    const villagersToAdd = n - allRoles.length
    console.log("We are adding " + villagersToAdd + " Villagers")
    // Fill with villagers
    for (i = 0; i < villagersToAdd; i++) {
        allRoles.push("Villager")
    }

    // Shuffle our players
    shuffle(playerListToUse)

    // Write this to a local file
    var fs = require('fs');
    const randomID = Math.floor(20 * Math.random())
    const fileName = 'werewolfRoles_' + randomID + '_.txt'

    console.log("This is the filename: " + fileName)
    
    fs.writeFile(fileName, '', function (err) {
        if (err) throw err;
        console.log("This list is generated with Random ID: " + randomID + " with filename: " + fileName)
    });

    var i = 0
    var fileContent = ""

    for (player in playerListToUse) {
        fileContent += allRoles[i++] + " : " + playerListToUse[player] + "\n"
    }

    fileContent += "\n\n\n"

    i = 1
    shuffle(playerListToUse)
    shuffle(playerListToUse)
    shuffle(playerListToUse)

    for (player in playerListToUse) {
        fileContent += i++ + ". " + playerListToUse[player] + "\n"
    }

    fs.appendFile(fileName, fileContent, function (err) {
        if (err) throw err;
    });
    
}


generateRoles()
