import React, { useEffect, useState } from 'react'
import {Grid,TextField,Typography,FormControlLabel,Checkbox,Button,Box,Alert,
InputLabel,MenuItem,Select,FormControl,FormLabel,RadioGroup,Radio,FormGroup,
Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar} from '@mui/material'
import {styled} from '@mui/material/styles'
//
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSaveProfileMutation,useGetResumeProfileQuery } from './services/candidateProfileApi';
function App() { 
 //Style for Upload Button
 const Input=styled('input')({
    display:'none',
 });
 const [name,setName]=useState()
 const [email, setEmail] = useState()
 const [gender,setGender]=useState()
 const [st,setSt]=useState("")
 const [pjl,setPjl]=useState([])
 const [pimage,setPimage]=useState('')
 const [rdoc,setRdoc]=useState('')
 const [error,setError]=useState({
  status:false,
  msg:"",
  type:""
 })
 const [candidates,setCandidates]=useState([])
 //Multi Checkbox
 const getPjl=(e)=>{
  let data=pjl
  data.push(e.target.value)
  setPjl(data)
 }
 //Clear Form
 const resetForm=()=>{
  setName('')
  setEmail('')
  setSt('')
  setGender('')
  setPjl([])
  setPimage('')
  setRdoc('')
  document.getElementById("resume-form").reset();
 }
 //RTK Query
 const [saveProfile] = useSaveProfileMutation();
 const {data, isSuccess} = useGetResumeProfileQuery()
 //console.log(data)
 useEffect(()=>{
  if(data && isSuccess){
    setCandidates(data.candidates)
  }
 },[data,isSuccess])
 //Handle Form Submission
 const handleSumbit=async(e)=>{
  e.preventDefault();
  const data=new FormData()
  data.append('name',name)
  data.append('email',email)
  data.append('gender',gender)
  data.append('st',st)
  data.append('pjl',pjl)
  data.append('pimage',pimage)
  data.append('rdoc',rdoc)
  
  if(name && email) {
    const res=await saveProfile(data)
    console.log(res)
    if(res.data.status=== "success"){
      setError({status:true,msg:"Resume Upload Successfully",type:"success"})
      resetForm()
    }
    if (res.data.status === "failed") {
      setError({
        status: true,
        msg: res.data.message,
        type: "error",
      })
      
    }
    
  }else{
    setError({status:true,msg:"All Feilds re Required",type:'error'})
  }
 }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          backgroundColor: "error.light",
          padding: 2,
        }}
      >
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          Resume Uploader
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <Box
            component="form"
            sx={{ p: 3 }}
            noValidate
            id="resume-form"
            onSubmit={handleSumbit}
          >
            <TextField
              id="name"
              name="name"
              required
              fullWidth
              margin="normal"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              name="email"
              required
              fullWidth
              margin="normal"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={st}
                label="State"
                onChange={(e) => {
                  setSt(e.target.value);
                }}
              >
                <MenuItem value="bihar">Bihar</MenuItem>
                <MenuItem value="up">UP</MenuItem>
                <MenuItem value="jharkhand">JH</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row name="gender" aria-labelledby="gender-radio">
                <FormControlLabel
                  value="male"
                  control={<Radio color="default" />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="default" />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="default" />}
                  label="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend">Preferred Job Location</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Delhi"
                  value="Delhi"
                  onChange={(e) => getPjl(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mumbai"
                  value="Mumbai"
                  onChange={(e) => getPjl(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Banglore"
                  value="Banglore"
                  onChange={(e) => getPjl(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Ranchi"
                  value="Ranchi"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Pune"
                  value="Pune"
                  onChange={(e) => getPjl(e)}
                />
              </FormGroup>
            </FormControl>
            <Stack direction="row" alignItems="center" spacing={4}>
              <label htmlFor="profile-photo">
                <Input
                  accept="image/*"
                  id="profile-photo"
                  type="file"
                  onChange={(e) => {
                    setPimage(e.target.files[0]);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload Photo
                </Button>
              </label>
              <label htmlFor="resume-file">
                <Input
                  accept="doc/*"
                  id="resume-file"
                  type="file"
                  onChange={(e) => {
                    setRdoc(e.target.files[0]);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload File
                </Button>
              </label>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              color="error"
            >
              Submit
            </Button>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              backgroundColor: "info.light",
              padding: 1,
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              List Of Candidate
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} arial-label="Simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Email Address</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate, i) => {
                  return (
                    <TableRow key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {candidate.name} 
                      </TableCell>
                      <TableCell align="center">{candidate.email}</TableCell>

                      <TableCell align="center">{candidate.state}</TableCell>
                      <TableCell align="center">{candidate.gender}</TableCell>
                      <TableCell align="center">{candidate.location}</TableCell>
                      <TableCell align="center">
                        <Avatar src={`http://127.0.0.1:3000/${candidate.pimage}`} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App
