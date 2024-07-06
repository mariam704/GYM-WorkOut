import React, {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import {Box} from '@mui/material';
import { exerciseOptions,fetchData,youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVedio from '../components/ExerciseVedio';
import SimilarExercise  from '../components/SimilarExercise';
 



const ExerciseDetail = () => {
  const [exerciseDetaill,setExerciseDetail]= useState({});
  const [exerciseVideos,setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const {id} = useParams();
  useEffect(()=> {
    const fetchExerciseesData = async () =>{
    const exerciseDbUrl= 'https://exercisedb.p.rapidapi.com';
    const youtubeSearchUrl= 'https://youtube-search-and-download.p.rapidapi.com';
    const exerciseDetailData= await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
    const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
    setExerciseVideos(exerciseVideosData.contents);
    setExerciseDetail(exerciseDetailData);
    const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
    setTargetMuscleExercises(targetMuscleExercisesData);

    const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
    setEquipmentExercises(equimentExercisesData);
    }
fetchExerciseesData();
  },[id]);
  return (
    <Box> 
     <Detail exerciseDetaill={exerciseDetaill} /> 
     <ExerciseVedio exerciseVideos={exerciseVideos} name={exerciseDetaill.name}/> 
      <SimilarExercise targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  );
}

export default ExerciseDetail;
