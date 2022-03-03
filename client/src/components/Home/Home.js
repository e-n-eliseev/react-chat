import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useLocalStorage } from 'hooks';
// styles
import { Form, Button } from 'react-bootstrap';

export function Home() {
  // создаем и записываем в локальное хранилище имя пользователя
  const [username, setUsername] = useLocalStorage('username', 'John');
  // локальное состояние для комнаты
  const [roomId, setRoomId] = useState('free');
  const linkRef = useRef(null);
  // обрабатываем изменение имени пользователя
  const handleChangeName = (e) => {
    setUsername(e.target.value);
  }
  // обрабатываем изменение комнаты
  const handleChangeRoom = (e) => {
    setRoomId(e.target.value);
  }
  // имитируем отправку формы
  const handleSubmit = (e) => {
    e.preventDefault();
    linkRef.current.click();
  }
  //удаляем пробелы в имени пользователя
  const trimmed = username.trim();

  return (
    <Form
      className='mt-5'
      style={{ maxWidth: '320px', margin: '0 auto' }}
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control value={username} onChange={handleChangeName} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Room:</Form.Label>
        <Form.Control as='select' value={roomId} onChange={handleChangeRoom}>
          <option value='free'>Free</option>
          <option value='job' disabled>
            Job
          </option>
        </Form.Control>
      </Form.Group>
      {trimmed && (
        <Button variant='success' as={Link} to={`/${roomId}`} ref={linkRef}>
          Chat
        </Button>
      )}
    </Form>
  )
}
