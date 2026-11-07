// Kirby's stats are kept together so every activity updates the same pet.
var MAX_ENERGY = 10;
var messageTimer = null;

var pet_info = {
  name: "Kirby",
  weight: 8,
  happiness: 6,
  energy: 8
};

$(function() {
  // Show the starting values, then connect each activity button to its action.
  checkAndUpdatePetInfoInHtml();
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);
});

function clickedTreatButton() {
  pet_info.happiness += 1;
  pet_info.weight += 1;
  checkAndUpdatePetInfoInHtml();
  showPetMessage("That treat was delicious! Thanks for looking after me.");
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 2;
  checkAndUpdatePetInfoInHtml();
  showPetMessage("Playing with you is fun! I'm ready to explore.");
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  pet_info.energy -= 3;
  checkAndUpdatePetInfoInHtml();
  showPetMessage("Whew! Exercise is good for me. Time for a breather!");
}

function clickedNapButton() {
  pet_info.happiness += 1;
  pet_info.energy += 3;
  checkAndUpdatePetInfoInHtml();
  showPetMessage("That nap was cozy. I'm feeling rested and happy!");
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Keep weight, happiness, and energy at zero or above.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }

  // Energy is capped at 10 so repeated naps stay within its displayed scale.
  if (pet_info.energy > MAX_ENERGY) {
    pet_info.energy = MAX_ENERGY;
  }
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.energy').text(pet_info.energy);
}

function showPetMessage(message) {
  var $petMessage = $('#pet-message');

  // Restart the timer so a quick follow-up click keeps the newest message visible.
  if (messageTimer !== null) {
    window.clearTimeout(messageTimer);
  }

  // jQuery addClass() adds "is-visible" to the message. CSS uses that class to
  // fade and slide the pet's comment into view after an activity button is pressed.
  $petMessage.addClass('is-visible');
  $petMessage.text(message);

  messageTimer = window.setTimeout(function() {
    // jQuery removeClass() removes "is-visible" when the timer expires. CSS then
    // fades the message away, while the live status element remains accessible.
    $petMessage.removeClass('is-visible');
    messageTimer = null;
  }, 2600);
}
