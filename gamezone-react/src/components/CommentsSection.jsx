import { useState } from 'react';

function CommentsSection() {
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [comments, setComments] = useState([]);

  function handleSubmit() {
    if (userName.trim() === '' || userComment.trim() === '') {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: userName,
      text: userComment,
    };

    setComments([...comments, newComment]);
    setUserName('');
    setUserComment('');
  }

  return (
    <section className="comments-section">
      <h2>Коментарі</h2>
      <p>Залиште свій відгук про платформу.</p>

      <div className="comment-form">
        <input
          type="text"
          placeholder="Введіть ваше ім'я"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <textarea
          placeholder="Введіть ваш коментар"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit}>Надіслати</button>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommentsSection;