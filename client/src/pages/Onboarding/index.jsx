import React, { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/")
    }
  }, [user]);

  return (
    <div>Onboarding</div>
  )
}

export default Onboarding