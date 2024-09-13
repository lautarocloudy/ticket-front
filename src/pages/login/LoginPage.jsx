import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { decode } from 'jwt-decode';
import { login } from '../../services/apiService';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      const { token } = response;

      // Guarda el token en localStorage
      localStorage.setItem('token', token);

      // Decodifica el token y redirige según el rol
      const decodedToken = decode(token);
      if (decodedToken.role === 'admin') {
        navigate('/admin');
      } else if (decodedToken.role === 'ticket') {
        navigate('/tickets');
      } else {
        navigate('/user-tickets');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register('email', { required: 'El correo es obligatorio' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            {...register('password', { required: 'La contraseña es obligatoria' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
