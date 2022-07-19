import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const UserProfile = ({user, isCurrentUser}) => {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={3} sx={{ p: 5 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>プロフィール</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Avatar sx={{ width: 150, height: 150 }} alt={user.name} src={user.avatar.url} />
          </Box>
          <TableContainer>
            <Table sx={{}}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">ニックネーム</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                {isCurrentUser &&
                  <TableRow>
                    <TableCell component="th">メールアドレス</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                }
                <TableRow>
                  <TableCell component="th">紹介文</TableCell>
                  <TableCell>{user.introduction}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfile
