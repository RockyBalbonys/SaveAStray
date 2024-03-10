// Sort Ascending
const ascendingPets = () => {
  return animals.sort(compareByNameAscending);
};

// Sort Descending
const descendingPets = () => {
  return animals.sort(compareByNameDescending);
};

function compareByNameAscending(a, b) {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

function compareByNameDescending(a, b) {
  return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
}

export { ascendingPets, descendingPets };
