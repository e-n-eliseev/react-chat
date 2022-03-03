//форматирование даты и времени
import TimeAgo from 'react-timeago';
//стили
import { ListGroup, Card, Button } from 'react-bootstrap';
//иконки
import { AiOutlineDelete } from 'react-icons/ai';
//работа с сообщениями
export const MessageListItem = ({ msg, removeMessage }) => {
  //обработчик удаления сообщения
  const handleRemoveMessage = (id) => {
    removeMessage(id);
  };

  const { messageId, messageText, senderName, createdAt, currentUser } = msg;
  return (
    <ListGroup.Item
      className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
    >
      <Card
        bg={`${currentUser ? 'primary' : 'secondary'}`}
        text='light'
        style={{ width: '55%' }}
      >
        <Card.Header className='d-flex justify-content-between align-items-center'>
          {/* выводим дату с использванием библиотеки */}
          <Card.Text as={TimeAgo} date={createdAt} className='small' />
          <Card.Text>{senderName}</Card.Text>
        </Card.Header>
        <Card.Body className='d-flex justify-content-between align-items-center'>
          <Card.Text>{messageText}</Card.Text>
          {/* тк удалять можно только свои сообщения, то проверяем пользователя */}
          {currentUser && (
            <Button
              variant='none'
              className='text-warning'
              onClick={() => handleRemoveMessage(messageId)}
            >
              <AiOutlineDelete />
            </Button>
          )}
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}
