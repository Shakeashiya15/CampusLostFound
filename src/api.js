let itemsData = [
  { id: 1, name: "Blue Backpack", type: "Lost", location: "Library", reporter: "Alice", description: "Lost near library entrance" },
  { id: 2, name: "Keys with Red Keychain", type: "Found", location: "Cafeteria", reporter: "Bob", description: "Found on cafeteria table" },
  { id: 3, name: "Notebook", type: "Lost", location: "Classroom 101", reporter: "Charlie", description: "Left on desk" },
];

export const fetchItems = () => {
  return new Promise((resolve) => setTimeout(() => resolve(itemsData), 300));
};

export const fetchItemById = (id) => {
  const item = itemsData.find((i) => i.id === parseInt(id));
  return new Promise((resolve, reject) =>
    setTimeout(() => (item ? resolve(item) : reject("Item not found")), 300)
  );
};

export const reportItem = (item) => {
  item.id = itemsData.length + 1;
  itemsData.push(item);
  return new Promise((resolve) => setTimeout(() => resolve(item), 300));
};
