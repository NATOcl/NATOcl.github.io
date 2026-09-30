// useUserProfile.js solo template
import { useParams, useNavigate } from 'react-router-dom';
 
export function useUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = {id: userId};
  const loading = false;
  const  displayName = 'Usuario no encotrado'
  const  handleSave = () => {
    alert('Cambios guardos para el usuario {userId}')};
 
  const goBack = () => navigate(-1);
 
  return { user, loading, displayName, handleSave, goBack };
}