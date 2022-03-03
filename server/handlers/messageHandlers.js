//пакет генерирования 
const { nanoid } = require("nanoid");
// настраиваем БД
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
//местоположение БД
const adapter = new FileSync("db/messages.json");
const db = low(adapter);

// записываем в БД начальные данные
db.defaults({
  messages: [
    {
      messageId: "1",
      userId: "1",
      senderName: "Вася",
      messageText: "Всем привет, как жизнь?",
      createdAt: "2022-03-01"
    },
    {
      messageId: "2",
      userId: "2",
      senderName: "Петя",
      messageText: "Нормально!",
      createdAt: "2022-03-01"
    }
  ]
}).write();

module.exports = (io, socket) => {
  const getMessages = () => {
    // обрабатка запроса на получение сообщений
    const messages = db.get("messages").value();
    //выводим сообщения комнаты
    io.in(socket.roomId).emit("messages", messages);
  };
  // обрабатка добавления сообщения
  const addMessage = (message) => {
    db.get("messages")
      .push({
        messageId: nanoid(8),
        createdAt: new Date(),
        ...message
      })
      .write();

    getMessages();
  };
  // обрабатка удаления сообщения
  const removeMessage = (messageId) => {
    db.get("messages").remove({ messageId }).write();

    getMessages();
  };
  // регистрируем обработчики
  socket.on("message:get", getMessages);
  socket.on("message:add", addMessage);
  socket.on("message:remove", removeMessage);
};
