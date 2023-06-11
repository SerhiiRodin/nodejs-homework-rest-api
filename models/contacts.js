const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const dataBoofer = await fs.readFile(contactsPath);
  const data = JSON.parse(dataBoofer);

  return data;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };

  console.log(body);

  const index = contacts.findIndex(
    (contact) => contact.name === body.name || contact.email === body.email
  );

  if (index !== -1) {
    return null;
  }

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index].name = body.name;
    contacts[index].email = body.email;
    contacts[index].phone = body.phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  // делаем деструктуризацию, чтоб получить не массив с объектом, а просто объект.
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
