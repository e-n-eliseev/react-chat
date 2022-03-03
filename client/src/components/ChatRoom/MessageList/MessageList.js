//хуки
import { useRef, useEffect } from 'react';
//стили
import { ListGroup } from 'react-bootstrap';
import { MessageListItem } from './MessageListItem';
//формируем обьект для инлайн стиля
const listStyles = {
  height: '80vh',
  border: '1px solid rgba(0,0,0,.4)',
  borderRadius: '4px',
  overflow: 'auto'
};
//работа со списком сообщения
export const MessageList = ({ messages, removeMessage }) => {
  //хук нужен для выполнения прокрутки при добавлении в список нового сообщения
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // плавная прокрутка, выполняемая при изменении массива сообщени
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages]);

  return (
    <>
      <ListGroup variant='flush' style={listStyles}>
        {messages.map((msg) => (
          <MessageListItem
            key={msg.messageId}
            msg={msg}
            removeMessage={removeMessage}
          />
        ))}
        <span ref={messagesEndRef}></span>
      </ListGroup>
    </>
  )
}
