import React ,{useState} from 'react';
import { Box } from '@mui/material';
import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
const Home = () => {
  // changes of thoes state will be reflacted cross all app thats why there in home page  
  const [bodyPart,setBodyPart]=useState('all');
  const [exercises,setExercise]=useState([]);
  console.log(bodyPart);
  return ( 
    <Box>
    <HeroBanner />
    <SearchExercises setExercise={setExercise} bodyPart={bodyPart} setBodyPart={setBodyPart} />
    <Exercises exercises={exercises} setExercise={setExercise} bodyPart={bodyPart} setBodyPart={setBodyPart} />
  </Box>
  );
}

export default Home;
