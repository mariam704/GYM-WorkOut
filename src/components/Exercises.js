import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import Loader from './Loader';
const Exercises = ({exercises,setExercise,bodyPart}) => {
    ////to show categories
    useEffect(() =>{
      const fetchExercisesData = async () =>{
      let exersisesData = [];
      if(bodyPart=== 'all') {
        exersisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises' ,exerciseOptions);
      } else {
        exersisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}` ,exerciseOptions);  
      }
      setExercise(exersisesData ); 
    }
    fetchExercisesData();
    }, [bodyPart]);
 // console.log(exercises);
 const [currentPage,setCurrentPage] = useState(1);
 const exercisesPerPage=9;
 
   // Pagination
   // 18   last num at currentpage=  2     *     9   
   const indexOfLastExercise = currentPage * exercisesPerPage;
   // to calc first    9      =          18         -   9
   const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
   //                                          9                      18
   const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate =(e,value) =>{
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };
  if (!currentExercises.length) return <Loader />;
  return (
   <Box id='exercise' sx={{mt:{lg:'110px'}}} mt='50px' p='20px'>
  <Typography variant='h3' mb='46px '> showing Results</Typography>
  <Stack direction='row' sx={{gap:{lg:'110px',xs:'50px'}}} flexWrap='wrap' justifyContent='center'>
  {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}

</Stack>
<Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination color="primary" shape="rounded"variant="outlined"
            defaultPage={1}
            page={currentPage}
            onChange={paginate}
            //ceil > higher num exampel 2.5=3 
            count={Math.ceil(exercises.length / exercisesPerPage)}
            size="large"
          />
        )}
      </Stack>
   </Box>
  );
}

export default Exercises;
