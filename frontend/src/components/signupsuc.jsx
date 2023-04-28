function hide() {
  document.getElementById('popup').style.display = 'none';
}

export default function SignUpSuc({ status }) {
  return (
    <div id="popup" className="popup">
      <div className="popup-close" onClick={hide}>
        X
      </div>
      User 
      <br />
      {status.user}
      <br />
      created successfully!
    </div>
  );
}