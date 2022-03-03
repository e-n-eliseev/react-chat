//клиенты чата
const users = {
  1: { username: 'Alice', online: false },
  2: { username: 'Bob', online: false }
};

module.exports = (io, socket) => {
  //запрос на получение списка пользователей
  const getUsers = () => {
    io.in(socket.roomId).emit('users', users)
  }
  //добавление пользователей
  const addUser = ({ username, userId }) => {
    if (!users[userId]) {
      users[userId] = { username, online: true }
    } else {
      users[userId].online = true
    }
    getUsers();
  }
  //удаление пользователя
  const removeUser = (userId) => {
    users[userId].online = false;
    getUsers();
  }
  //регистрация обработчиков
  socket.on('user:get', getUsers);
  socket.on('user:add', addUser);
  socket.on('user:leave', removeUser);
}
