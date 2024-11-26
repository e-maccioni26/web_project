import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envoyer la requête d'inscription
      await axios.post('/api/register', {
        nom,
        prenom,
        email,
        mdp: password,
      });

      // Rediriger vers la page de login après une inscription réussie
      alert('Inscription réussie, vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Erreur lors de la création du compte. Veuillez réessayer.');
    }
  };

  return (
    <div className="register-page">
      <h1>Créer un Compte</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>Vous avez déjà un compte ? <a href="/login">Connectez-vous ici</a></p>
    </div>
  );
};

export default RegisterPage;