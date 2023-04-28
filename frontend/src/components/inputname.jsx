function validateSignup(setError) {
  const name = document.getElementById('name').value;
  const signupButton = document.getElementById('signup-button');
  console.log(name);
  if (!name) {
    setError('Please fill name');
    signupButton.disabled =  true;
  } else {
    setError('');
    signupButton.disabled =  false;
  }
}

export default function InputName({ setError }) {
  return (
    <>
      <input 
        id="name" 
        onChange={() => validateSignup(setError)} 
        type="text"
        placeholder="Name"
      />
    </>      
  );
}