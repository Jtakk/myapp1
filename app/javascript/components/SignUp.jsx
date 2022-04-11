import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUp = (props) => {
  const [name, setName] = React.useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [email, setEmail] = React.useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState('');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5}}>
      <Box sx={{ p: 5, bgcolor: '#cfe8fc' }}>
        <Typography variant="h4" align="center">Sign Up</Typography>
        <form action="/users" method="post">
          <input name="authenticity_token" type="hidden" value="" />
          <TextField fullWidth required label="Name" value={name} name="user[name]" onChange={handleNameChange} placeholder="山田太郎" type="text" variant="outlined" margin="normal" />
          <TextField fullWidth required label="Email" value={email} name="user[email]" onChange={handleEmailChange} placeholder="test@example.com" type="email" variant="outlined" margin="normal" />
          <TextField fullWidth required label="Password" value={password} name="user[password]" onChange={handlePasswordChange} placeholder="foo123" helperText="半角英数6文字以上" type="password" variant="outlined" margin="normal" />
          <TextField fullWidth required label="Password Confirmation" value={passwordConfirmation} name="user[password_confirmation]" onChange={handlePasswordConfirmationChange} placeholder="foo123" helperText="半角英数6文字以上" type="password" variant="outlined" margin="normal" />
          <Button type="submit" variant="contained" fullWidth>Create My Account</Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp
