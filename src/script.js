// Function to get attribute values
function getAttributeValue(attributeId) {
  return parseInt(document.getElementById(attributeId).value) || 0;
}

// Function to get skill values
function getSkillValue(skillId) {
  return parseInt(document.getElementById(skillId).value) || 0;
}

function createMacro() {
  const macroName = document.getElementById('macro-name').value;
  const macroDescription = document.getElementById('macro-description').value;
  const macroAttribute = document.getElementById('macro-attribute').value;
  const macroSkill = document.getElementById('macro-skill').value;

  const macro = {
    name: macroName,
    description: macroDescription,
    attribute: macroAttribute,
    skill: macroSkill
  };

  saveMacro(macro);
  displaySavedMacros();
}

function saveMacro(macro) {
  let macros = JSON.parse(localStorage.getItem('macros')) || [];
  macros.push(macro);
  localStorage.setItem('macros', JSON.stringify(macros));
}

function displaySavedMacros() {
  const savedMacrosDiv = document.getElementById('saved-macros');
  savedMacrosDiv.innerHTML = '';

  const macros = JSON.parse(localStorage.getItem('macros')) || [];
  macros.forEach((macro, index) => {
    const macroDiv = document.createElement('div');
    macroDiv.className = 'macro';
    macroDiv.innerHTML = `
      <h3>${macro.name}</h3>
      <p>${macro.description}</p>
      <button class="dice-button" onclick="rollSavedMacro(${index})">Rolar Macro</button>
      <button class="dice-button" onclick="removeMacro(${index})">Remover Macro</button>
    `;
    savedMacrosDiv.appendChild(macroDiv);
  });
}

function rollSavedMacro(index) {
  const macros = JSON.parse(localStorage.getItem('macros')) || [];
  const macro = macros[index];

  const attribute = getAttributeValue(macro.attribute);
  const skill = getSkillValue(macro.skill);
  let rolls = [];
  let total = 0;

  for (let i = 0; i < attribute; i++) {
    const roll = Math.floor(Math.random() * 20) + 1;
    rolls.push(roll);
    total += roll;
  }

  total += skill;
  const rollsStr = rolls.map(roll => `(${roll})`).join(' + ') + ` + ${skill} = ${total}`;
  alert(`Macro: ${macro.name}\nDescrição: ${macro.description}\nRolls: ${rollsStr}\nResultado: ${total}`);
}

function removeMacro(index) {
  let macros = JSON.parse(localStorage.getItem('macros')) || [];
  macros.splice(index, 1);
  localStorage.setItem('macros', JSON.stringify(macros));
  displaySavedMacros();
}

function saveAttributes() {
  const attributes = {
    strength: getAttributeValue('strength'),
    agility: getAttributeValue('agility'),
    intellect: getAttributeValue('intellect'),
    stamina: getAttributeValue('stamina'),
    presence: getAttributeValue('presence')
  };
  localStorage.setItem('attributes', JSON.stringify(attributes));
}

function loadAttributes() {
  const attributes = JSON.parse(localStorage.getItem('attributes')) || {};
  document.getElementById('strength').value = attributes.strength || 0;
  document.getElementById('agility').value = attributes.agility || 0;
  document.getElementById('intellect').value = attributes.intellect || 0;
  document.getElementById('stamina').value = attributes.stamina || 0;
  document.getElementById('presence').value = attributes.presence || 0;
}

function saveSkills() {
  const skills = {};
  document.querySelectorAll('.skills select').forEach(select => {
    skills[select.id] = getSkillValue(select.id);
  });
  localStorage.setItem('skills', JSON.stringify(skills));
}

function loadSkills() {
  const skills = JSON.parse(localStorage.getItem('skills')) || {};
  document.querySelectorAll('.skills select').forEach(select => {
    select.value = skills[select.id] || 0;
  });
}

function saveAll() {
  saveAttributes();
  saveSkills();
  saveMacros();
}

function loadAll() {
  loadAttributes();
  loadSkills();
  displaySavedMacros();
}

function saveMacros() {
  const macros = JSON.parse(localStorage.getItem('macros')) || [];
  localStorage.setItem('macros', JSON.stringify(macros));
}

function loadMacros() {
  const macros = JSON.parse(localStorage.getItem('macros')) || [];
  displaySavedMacros();
}

// Display saved macros and load attributes and skills on page load
document.addEventListener('DOMContentLoaded', loadAll);

// Save all data before the page unloads
window.addEventListener('beforeunload', saveAll);
