// UserProfile.jsx — solo template
import {useUserProfile} from "../hooks/useUserProfile.js";

export function UserProfile() {
  const { user, loading, displayName, handleSave, goBack } = useUserProfile();
 
  if (loading) return <Spinner />;
 
  return (
    <div className="profile">
      <button onClick={goBack}>Volver</button>
      <h2>{displayName}</h2>
      <SaveButton onClick={handleSave} />
    </div>
  );
}